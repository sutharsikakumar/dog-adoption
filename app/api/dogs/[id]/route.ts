import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const dog = {
    name: formData.get('name') as string,
    breed: formData.get('breed') as string,
    age: parseInt(formData.get('age') as string),
    status: formData.get('status') === 'true'
  }

  const { error } = await supabase
    .from('dogs')
    .insert([dog])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.redirect(new URL('/private', request.url))
}