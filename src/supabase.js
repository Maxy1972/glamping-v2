import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfowzvykxoczmfbbwbhk.supabase.co'
const supabaseKey = 'sb_publishable_cFOzMNLFVdv-zqlbFYzgNg_TJozjdsZ'

export const supabase = createClient(supabaseUrl, supabaseKey)
