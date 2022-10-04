import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import LogoImg from './assets/nlw-esports-logo.svg'
import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import { getAllGames } from './api/games'
import CreateAdModal from './components/CreateAdModal'

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  const fetchAllGames = async () => {
    try {
      const response = await getAllGames()
      setGames(response?.data)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchAllGames()
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={LogoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-8'>
        {games.map(game => (
          <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
