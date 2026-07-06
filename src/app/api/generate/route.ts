import { NextRequest, NextResponse } from 'next/server'
import { createSuccessResponse, createErrorResponse } from '@/utils/api-response'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { portraitUrl, schoolId, style, graduationYear } = body

    // Validation
    if (!portraitUrl) {
      return NextResponse.json(
        createErrorResponse('MISSING_FIELD', 'portraitUrl is required'),
        { status: 400 }
      )
    }

    if (!schoolId) {
      return NextResponse.json(
        createErrorResponse('MISSING_FIELD', 'schoolId is required'),
        { status: 400 }
      )
    }

    if (!style) {
      return NextResponse.json(
        createErrorResponse('MISSING_FIELD', 'style is required'),
        { status: 400 }
      )
    }

    // Create job ID for tracking
    const jobId = nanoid(16)

    // Mock response - in production, this would queue to Bull/BullMQ
    const mockPosterUrl = `https://via.placeholder.com/800x1000.png?text=${encodeURIComponent(
      `${style} Style Poster`
    )}`

    return NextResponse.json(
      createSuccessResponse({
        jobId,
        status: 'completed', // Mock - would be 'processing' in real system
        posterUrl: mockPosterUrl,
        watermarked: true,
        graduationYear,
        estimatedTime: 45,
      })
    )
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        'INTERNAL_ERROR',
        'Failed to generate poster'
      ),
      { status: 500 }
    )
  }
}
