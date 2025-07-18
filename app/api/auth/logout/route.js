import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out' });
  res.cookies.set('user-role', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return res;
}
