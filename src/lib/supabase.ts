import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qlhrdgclyxfamngtspws.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsaHJkZ2NseXhmYW1uZ3RzcHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NDEwODksImV4cCI6MjA4MjQxNzA4OX0.hxDvWhrcfQh2vQUJxjzw_I5VHlaQFqHSLuklC397XUo';

export const supabase = createClient(supabaseUrl, supabaseKey);
