import { useState, useEffect } from 'react'
import { RefreshCw, Heart, Volume2 } from 'lucide-react'

interface Quote {
    q: string;
    a: string;
    translation: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: 'motivation' | 'family' | 'wisdom';
}

const germanQuotes: Quote[] = [
    { q: 'Übung macht den Meister.', a: 'Deutsches Sprichwort', translation: 'Practice makes perfect.', difficulty: 'beginner', category: 'motivation' },
    { q: 'Der Apfel fällt nicht weit vom Stamm.', a: 'Deutsches Sprichwort', translation: 'The apple doesn\'t fall far from the tree.', difficulty: 'intermediate', category: 'family' },
    { q: 'Alle guten Dinge sind drei.', a: 'Deutsches Sprichwort', translation: 'All good things come in threes.', difficulty: 'beginner', category: 'wisdom' },
    { q: 'Morgenstund hat Gold im Mund.', a: 'Deutsches Sprichwort', translation: 'The early bird catches the worm.', difficulty: 'intermediate', category: 'motivation' },
    { q: 'Was du heute kannst besorgen, das verschiebe nicht auf morgen.', a: 'Deutsches Sprichwort', translation: 'Don\'t put off until tomorrow what you can do today.', difficulty: 'advanced', category: 'motivation' },
    { q: 'Aller Anfang ist schwer.', a: 'Deutsches Sprichwort', translation: 'Every beginning is difficult.', difficulty: 'beginner', category: 'motivation' },
    { q: 'Ende gut, alles gut.', a: 'Deutsches Sprichwort', translation: 'All\'s well that ends well.', difficulty: 'beginner', category: 'wisdom' },
    { q: 'Ohne Fleiß kein Preis.', a: 'Deutsches Sprichwort', translation: 'No pain, no gain.', difficulty: 'intermediate', category: 'motivation' },
    { q: 'Wer A sagt, muss auch B sagen.', a: 'Deutsches Sprichwort', translation: 'In for a penny, in for a pound.', difficulty: 'advanced', category: 'wisdom' }
]

const difficultyColors: Record<Quote['difficulty'], string> = {
    beginner: 'bg-green-100 text-green-600 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    advanced: 'bg-red-100 text-red-600 border-red-200'
}

export default function CompactQuotePanel() {
    const [quote, setQuote] = useState<Quote>(germanQuotes[0])
    const [showTranslation, setShowTranslation] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const getRandomQuote = () => {
        setIsAnimating(true)
        setTimeout(() => {
            let newQuote
            do {
                newQuote = germanQuotes[Math.floor(Math.random() * germanQuotes.length)]
            } while (newQuote === quote && germanQuotes.length > 1)

            setQuote(newQuote)
            setShowTranslation(false)
            setIsLiked(false)
            setIsAnimating(false)
        }, 200)
    }

    const toggleTranslation = () => setShowTranslation(prev => !prev)
    const toggleLike = () => setIsLiked(prev => !prev)

    const speakQuote = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(quote.q)
            utterance.lang = 'de-DE'
            utterance.rate = 0.9
            window.speechSynthesis.speak(utterance)
        }
    }

    useEffect(() => { getRandomQuote() }, [])

    return (
        <div className="mx-auto p-5 border-none bg-white rounded-2xl shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Daily Quote</h1>
            <div className="bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-200 rounded-lg p-3 shadow-xl border-2 border-orange-300/80 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-400/60 via-amber-400/40 to-transparent rounded-full -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-yellow-400/50 via-orange-400/30 to-transparent rounded-full -ml-8 -mb-8" />

                <div className="flex items-center justify-between mb-2 relative z-10">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border-2 ${difficultyColors[quote.difficulty]} shadow-lg backdrop-blur-sm`}>{quote.difficulty}</span>
                    <div className="flex space-x-1">
                        <button 
                            onClick={speakQuote} 
                            className="p-2 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl" 
                            title="Pronounce"
                        >
                            <Volume2 className="w-3 h-3" />
                        </button>
                        <button 
                            onClick={toggleLike} 
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl ${
                                isLiked 
                                    ? 'bg-gradient-to-br from-red-300 to-pink-400 text-white border-2 border-red-300' 
                                    : 'bg-gradient-to-br from-gray-300 to-gray-400 hover:from-red-200 hover:to-pink-300 text-white hover:text-white border-2 border-gray-300 hover:border-red-300'
                            }`} 
                            title="Like"
                        >
                            <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} relative z-10`}>                    
                    <blockquote className="text-[14px] font-medium text-gray-800 mb-2">
                        <span className="text-orange-600 text-lg">"</span>
                        <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
                            {quote.q}
                        </span>
                        <span className="text-orange-600 text-lg">"</span>
                    </blockquote>
                    <div className="flex items-center justify-end space-x-1 mb-2">
                        <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">— {quote.a}</span>
                    </div>

                    <div className="border-t-2 border-gradient-to-r from-orange-300 to-amber-300 pt-2">
                        <button 
                            onClick={toggleTranslation} 
                            className="text-[11px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-1"
                        >
                            <span>🌐</span><span>{showTranslation ? 'Hide' : 'Show'} translation</span>
                        </button>
                        {showTranslation && (
                            <div className="mt-2 p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-lg">
                                <p className="text-[12px] font-semibold text-gray-700 italic">
                                    "{quote.translation}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    onClick={getRandomQuote} 
                    disabled={isAnimating} 
                    className="mt-3 w-full py-2 rounded-lg font-bold text-[13px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-1 shadow-xl hover:shadow-2xl transform hover:scale-[1.03] active:scale-[0.97] border-2 border-orange-400/70 text-white"
                >
                    <RefreshCw className={`w-3 h-3 ${isAnimating ? 'animate-spin' : ''}`} />
                    <span className="drop-shadow-sm font-extrabold">New Quote</span>
                </button>
            </div>
        </div>
    )
}