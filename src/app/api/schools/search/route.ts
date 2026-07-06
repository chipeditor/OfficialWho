import { NextRequest, NextResponse } from 'next/server'
import { searchSchools } from '@/lib/mock-data'
import { createSuccessResponse, createErrorResponse } from '@/utils/api-response'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json(
      createErrorResponse(
        'INVALID_INPUT',
        'Search query must be at least 2 characters'
      ),
      { status: 400 }
    )
  }

  try {
    const results = await searchSchools(query)

    return NextResponse.json(
      createSuccessResponse({
        schools: results,
        count: results.length,
      })
    )
  } catch (error) {
    return NextResponse.json(
      createErrorResponse(
        'INTERNAL_ERROR',
        'Failed to search schools'
      ),
      { status: 500 }
    )
  }
}
