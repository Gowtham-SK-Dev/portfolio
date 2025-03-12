import { NextResponse } from "next/server"
import { google } from "googleapis"
import type { Readable } from "stream"
import * as XLSX from "xlsx"

// Google Drive setup
async function getGoogleDriveAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
  })

  return auth
}

// Function to check if file exists and get its ID
async function getFileId(drive: any, fileName: string, folderId?: string) {
  try {
    const query = folderId
      ? `name='${fileName}' and '${folderId}' in parents and trashed=false`
      : `name='${fileName}' and trashed=false`

    const response = await drive.files.list({
      q: query,
      fields: "files(id, name)",
    })

    const files = response.data.files
    if (files && files.length > 0) {
      return files[0].id
    }
    return null
  } catch (error) {
    console.error("Error checking file existence:", error)
    return null
  }
}

// Function to create or update Excel file in Google Drive
async function saveToGoogleDrive(data: any) {
  try {
    const auth = await getGoogleDriveAuth()
    const drive = google.drive({ version: "v3", auth })

    // File name for the spreadsheet
    const fileName = "contact_form_submissions.xlsx"

    // Check if file already exists
    const fileId = await getFileId(drive, fileName)

    // Create workbook and worksheet
    let workbook: XLSX.WorkBook
    let worksheet: XLSX.WorkSheet

    if (fileId) {
      // If file exists, download it first
      const response = await drive.files.get(
        {
          fileId: fileId,
          alt: "media",
        },
        { responseType: "stream" },
      )

      // Convert stream to buffer
      const chunks: Buffer[] = []
      const stream = response.data as unknown as Readable

      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk))
      }

      const buffer = Buffer.concat(chunks)

      // Read existing workbook
      workbook = XLSX.read(buffer, { type: "buffer" })
      worksheet = workbook.Sheets[workbook.SheetNames[0]]

      // Get existing data
      const existingData = XLSX.utils.sheet_to_json(worksheet)

      // Add new data
      existingData.push({
        ...data,
        timestamp: new Date().toISOString(),
      })

      // Update worksheet
      worksheet = XLSX.utils.json_to_sheet(existingData)
    } else {
      // Create new workbook
      workbook = XLSX.utils.book_new()

      // Create worksheet with headers
      worksheet = XLSX.utils.json_to_sheet([
        {
          ...data,
          timestamp: new Date().toISOString(),
        },
      ])
    }

    // Update or add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions")

    // Convert to buffer
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

    if (fileId) {
      // Update existing file
      await drive.files.update({
        fileId: fileId,
        media: {
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          body: buffer,
        },
      })
    } else {
      // Create new file
      await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        media: {
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          body: buffer,
        },
      })
    }

    return true
  } catch (error) {
    console.error("Error saving to Google Drive:", error)
    return false
  }
}

// Alternative: Save to local Excel file (for development or if Google Drive setup is not available)
async function saveToLocalExcel(data: any) {
  try {
    const fs = require("fs")
    const path = require("path")

    const filePath = path.join(process.cwd(), "contact_submissions.xlsx")
    let workbook: XLSX.WorkBook
    let worksheet: XLSX.WorkSheet

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Read existing file
      const fileBuffer = fs.readFileSync(filePath)
      workbook = XLSX.read(fileBuffer, { type: "buffer" })
      worksheet = workbook.Sheets[workbook.SheetNames[0]]

      // Get existing data
      const existingData = XLSX.utils.sheet_to_json(worksheet)

      // Add new data
      existingData.push({
        ...data,
        timestamp: new Date().toISOString(),
      })

      // Update worksheet
      worksheet = XLSX.utils.json_to_sheet(existingData)
    } else {
      // Create new workbook
      workbook = XLSX.utils.book_new()

      // Create worksheet with headers
      worksheet = XLSX.utils.json_to_sheet([
        {
          ...data,
          timestamp: new Date().toISOString(),
        },
      ])
    }

    // Update or add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions")

    // Write to file
    XLSX.writeFile(workbook, filePath)

    return true
  } catch (error) {
    console.error("Error saving to local Excel:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Try to save to Google Drive first
    let success = false

    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      success = await saveToGoogleDrive(data)
    }

    // If Google Drive fails or not configured, save locally
    if (!success) {
      success = await saveToLocalExcel(data)
    }

    if (success) {
      return NextResponse.json({ success: true, message: "Form submitted successfully" })
    } else {
      return NextResponse.json({ success: true, message: "Data saved in Local Server" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

