import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar, CheckCircle, MapPin } from 'lucide-react'

type PurchaseSuccessProps = {
  appointmentDate: Date
  googleMeetLink: string
}
// <CheckCircle className="text-green-500 w-6 h-6" />

export function PurchaseSuccess({
  appointmentDate,
  googleMeetLink,
}: PurchaseSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 justify-center">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <CardTitle className="text-3xl font-bold text-blue-700">
              Consulta Confirmada
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 text-lg text-center">
            Parabéns por investir no seu bem-estar emocional. Estamos aqui para
            apoiar sua jornada de autoconhecimento e equilíbrio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-2">
              <Calendar className="text-blue-600 w-5 h-5" />
              <span className="text-blue-800">
                📅{' '}
                {appointmentDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-600 w-5 h-5" />
              <span className="text-blue-800">
                📍 Consulta online via Google Meet
              </span>
            </div>
          </div>
          <a
            href={googleMeetLink}
            className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            👉 Acessar minha sessão
          </a>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg text-sm">
            <h3 className="font-semibold text-purple-700 mb-2">
              💡 Preparando-se para sua consulta:
            </h3>
            <ul className="text-gray-700 space-y-1">
              <li>✨ Escolha um local tranquilo e confortável</li>
              <li>🎧 Use fones de ouvido para maior privacidade</li>
              <li>📝 Anote quaisquer pontos que gostaria de discutir</li>
            </ul>
            <p className="mt-2 text-purple-600">
              Estamos ansiosos para te ouvir e ajudar em sua jornada de
              bem-estar! 💙
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
