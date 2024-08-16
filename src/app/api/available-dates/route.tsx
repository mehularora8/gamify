import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  const supabaseUrl = 'https://xucbswzhkwbwqcxybhfu.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1Y2Jzd3poa3did3FjeHliaGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNjg2NTcsImV4cCI6MjAzNzY0NDY1N30.i6q5KtzQb1VVPsAZByONaUeWgonuuEbhzd5VPerX4Fk';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('words')
      .select('created_at')
      .lte('created_at', new Date().toLocaleDateString('en-CA'))
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const dates = data.map(row => row.created_at.split('T')[0]);
    return NextResponse.json(dates);
  } catch (error) {
    console.error('Error fetching dates:', error);
    return NextResponse.json({ error: 'Failed to fetch dates' }, { status: 500 });
  }
}