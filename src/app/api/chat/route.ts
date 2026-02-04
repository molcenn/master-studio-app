import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Mesaj boş olamaz' }, { status: 400 })
    }
    
    // Clawdbot Gateway API'sine bağlan
    const gatewayUrl = process.env.CLAWDBOT_GATEWAY_URL || 'http://localhost:3333'
    const gatewayToken = process.env.CLAWDBOT_GATEWAY_TOKEN
    
    if (!gatewayToken) {
      console.error('CLAWDBOT_GATEWAY_TOKEN bulunamadı')
      return fallbackResponse(message)
    }

    try {
      const response = await fetch(`${gatewayUrl}/api/sessions/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gatewayToken}`
        },
        body: JSON.stringify({
          message: `[Master Studio Chat] ${message}`,
          timeoutSeconds: 30
        }),
        signal: AbortSignal.timeout(35000)
      })

      if (!response.ok) {
        throw new Error(`Gateway API error: ${response.status}`)
      }

      const data = await response.json()
      
      return NextResponse.json({
        success: true,
        response: data.response || data.message || 'Bir şeyler ters gitti 🐄',
        timestamp: new Date().toISOString(),
        model: 'Betsy (Clawdbot)',
        version: '1.0'
      })
      
    } catch (apiError) {
      console.error('Clawdbot API error:', apiError)
      return fallbackResponse(message)
    }
    
  } catch (error: any) {
    console.error('Chat route error:', error)
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası' }, 
      { status: 500 }
    )
  }
}

function fallbackResponse(message: string) {
  const lower = message.toLowerCase()
  
  // Akıllı fallback cevaplar
  let response = ''
  
  if (lower.includes('merhaba') || lower.includes('selam')) {
    response = 'Merhaba! Master Studio\'ya hoş geldin! Şu an API bağlantım yok ama yine de yardım etmeye çalışırım. 🐄'
  } else if (lower.includes('proje')) {
    response = 'Proje için harika fikirler var! Normal durumda daha detaylı yardım edebilirim, şu an bağlantım kesildi. 🐄'
  } else if (lower.includes('nasılsın')) {
    response = 'API bağlantım yok ama ruhum yüksek! Yakında tam kapasiteyle dönerim. 🐄'
  } else {
    response = 'Şu an tam olarak bağlanamıyorum ama Master Studio\'da harika işler yapacağız! Birazdan tekrar dene. 🐄'
  }
  
  return NextResponse.json({
    success: true,
    response: response,
    timestamp: new Date().toISOString(),
    model: 'Betsy (Fallback)',
    version: '1.0',
    fallback: true
  })
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Master Studio Chat API - Betsy ile konuşuyor',
    version: '1.0',
    model: 'Clawdbot Integration'
  })
}