import { NextRequest, NextResponse } from 'next/server'
import { createSuccessResponse, createErrorResponse } from '@/utils/api-response'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        createErrorResponse('MISSING_FIELD', 'file is required'),
        { status: 400 }
      )
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return NextResponse.json(
        createErrorResponse(
          'UNSUPPORTED_FORMAT',
          'Only JPEG, PNG, and WebP images are supported'
        ),
        { status: 400 }
      )
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        createErrorResponse('FILE_TOO_LARGE', 'File must be under 50MB'),
        { status: 400 }
      )
    }

    // Mock response - in production, upload to Supabase storage
    const mockUrl = `https://via.placeholder.com/400x500.png?text=${encodeURIComponent(
      file.name
    )}`

    return NextResponse.json(
      createSuccessResponse({
        uploadedUrl: mockUrl,
        previewUrl: mockUrl,
        fileName: file.name,
        size: file.size,
        type: file.type,
      })
    )
  } catch (error) {
    return NextResponse.json(
      createErrorResponse('INTERNAL_ERROR', 'Failed to upload file'),
      { status: 500 }
    )
  }
}
