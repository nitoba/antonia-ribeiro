'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertCircle, ArrowRight, MessageCircle } from 'lucide-react'

type PurchaseFailedProps = {
  onTryAgain: () => void
}

export function PurchaseFailed({ onTryAgain }: PurchaseFailedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-red-500 text-white rounded-t-lg">
          <CardTitle className="text-center text-2xl font-bold flex items-center justify-center space-x-2">
            <AlertCircle className="h-8 w-8" />
            <span>😔 Ops... Não conseguimos finalizar sua compra.</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <p className="text-gray-700 text-lg">
            Infelizmente, algo deu errado no processo. Mas não se preocupe! Pode
            ter sido apenas um problema temporário. Estamos aqui para te ajudar
            a resolver isso e garantir que você consiga agendar sua consulta.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">
              O que fazer agora?
            </h3>
            <ul className="list-none space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">1️⃣</span>
                <span>Tente novamente clicando no botão abaixo.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">2️⃣</span>
                <span>Caso o problema persista, entre em contato conosco.</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            onClick={onTryAgain}
          >
            Tentar novamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 text-lg py-6"
            asChild
          >
            <a
              href="https://dub.sh/contato"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              Fale com a gente pelo WhatsApp
              <MessageCircle className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </CardFooter>
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
            <span className="font-semibold">💡 Nota:</span> Sabemos como seu
            tempo é valioso, por isso estamos prontos para resolver qualquer
            problema rapidamente. Sua saúde emocional é a nossa prioridade. 🌟
          </p>
        </div>
      </Card>
    </div>
  )
}
