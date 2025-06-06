import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

const germanQuotes = [
    { q: 'Übung macht den Meister.', a: 'Deutsches Sprichwort' },
    { q: 'Der Apfel fällt nicht weit vom Stamm.', a: 'Deutsches Sprichwort' },
    { q: 'Alle guten Dinge sind drei.', a: 'Deutsches Sprichwort' },
    { q: 'Morgenstund hat Gold im Mund.', a: 'Deutsches Sprichwort' },
    { q: 'Was du heute kannst besorgen, das verschiebe nicht auf morgen.', a: 'Deutsches Sprichwort' }, 
    { q: 'Aller Anfang ist schwer.', a: 'Deutsches Sprichwort' },
    { q: 'Ende gut, alles gut.', a: 'Deutsches Sprichwort' },
    { q: 'Ohne Fleiß kein Preis.', a: 'Deutsches Sprichwort' },
    { q: 'Wer A sagt, muss auch B sagen.', a: 'Deutsches Sprichwort' }
]

export default function QuotePanel() {
    const [quote, setQuote] = useState(germanQuotes[0])

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * germanQuotes.length)
        setQuote(germanQuotes[randomIndex])
    }

    useEffect(() => {
        getRandomQuote()
    }, [])

    return (
        <div className="w-full bg-yellow-50 rounded-lg pl-4 pr-4 pt-2 pb-2 flex items-center space-x-4 mt-6 min-h-[20%]">
            <img
                src="https://source.unsplash.com/random/80x80?funny,germany"
                alt="Random visual"
                className="w-16 h-16 rounded-full object-cover"
            />

            <div className="flex-1">
                <p className="text-sm text-[#fd7b01] italic font-semibold">“{quote.q}”</p>
                <p className="text-xs text-[#ffae62] text-right mt-1">— {quote.a}</p>
            </div>

            <button
                onClick={getRandomQuote}
                className="text-xs text-blue-500 hover:underline"
            >
                <FontAwesomeIcon icon={faRotateRight} />
            </button>
        </div>
    )
}
