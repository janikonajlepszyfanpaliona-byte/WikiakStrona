'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, path: string) => {
    if (window.location.pathname !== '/') {
      // If we are not on the home page, let the default link behavior happen (navigate to path)
      return;
    }
    
    e.preventDefault();
    if (sectionId === 'home') {
      const start = window.scrollY;
      const targetTop = 0;
      const dist = targetTop - start;
      const dur = 1000;
      let t: number | null = null;
      const step = (now: number) => {
        if (!t) t = now;
        const p = Math.min((now - t) / dur, 1);
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        window.scrollTo(0, start + dist * ease);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      return;
    }
    const element = document.getElementById(sectionId);
    if (!element) return;
    const start = window.scrollY;
    const targetTop = element.getBoundingClientRect().top + window.scrollY;
    const dist = targetTop - start;
    const dur = 1000;
    let t: number | null = null;
    const step = (now: number) => {
      if (!t) t = now;
      const p = Math.min((now - t) / dur, 1);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      window.scrollTo(0, start + dist * ease);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const minimax = (boardState: any[], player: string): any => {
    const availSpots = boardState.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
    const winner = calculateWinner(boardState);
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move: any = {};
      move.index = availSpots[i];
      boardState[availSpots[i]] = player;

      if (player === 'O') {
        let result = minimax(boardState, 'X');
        move.score = result.score;
      } else {
        let result = minimax(boardState, 'O');
        move.score = result.score;
      }

      boardState[availSpots[i]] = null;
      moves.push(move);
    }

    let bestMove = 0;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;

    // Player move (X)
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setXIsNext(false);

    // AI Move (O) - Unbeatable Minimax
    const gameWon = calculateWinner(newBoard);
    if (!gameWon && !newBoard.every((square) => square !== null)) {
      setTimeout(() => {
        const aiBoard = [...newBoard];
        const bestPlay = minimax(aiBoard, 'O');
        if (bestPlay.index !== undefined) {
          aiBoard[bestPlay.index] = 'O';
          setBoard(aiBoard);
          setXIsNext(true);
        }
      }, 400);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <footer className="bg-black pt-20 pb-8 text-white font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Column 1: Info */}
          <div className="max-w-xs">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">wikak.eu</h2>
            <div className="flex gap-5 pb-6 items-center">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('biznes.wikaczek@gmail.com');
                  alert('Skopiowano email do schowka: biznes.wikaczek@gmail.com');
                }}
                className="text-white hover:text-gray-300 transition-colors"
                title="Skopiuj email"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>
              </button>
              <a href="https://discord.gg/S23qpDDd86" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>
              <a href="https://www.youtube.com/@wikaczek" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav Container */}
          <div className="flex gap-16 md:mx-auto">
            {/* Column 2: Nav 1 */}
            <div className="flex flex-col text-[15px] font-medium">
              <div className="flex flex-col gap-6 text-[#a1a1aa]">
                <a href="/" onClick={(e) => scrollToSection(e, 'home', '/')} className="hover:text-white transition-colors cursor-pointer">{t('footer.home')}</a>
                <a href="/portfolio" onClick={(e) => scrollToSection(e, 'portfolio', '/portfolio')} className="hover:text-white transition-colors cursor-pointer">{t('footer.portfolio')}</a>
                <a href="/#o-mnie" onClick={(e) => scrollToSection(e, 'o-mnie', '/#o-mnie')} className="hover:text-white transition-colors cursor-pointer">{t('footer.about')}</a>
              </div>
            </div>

            {/* Column 3: Nav 2 */}
            <div className="flex flex-col text-[15px] font-medium">
              <div className="flex flex-col gap-6 text-[#a1a1aa]">
                <a href="/#faq" onClick={(e) => scrollToSection(e, 'faq', '/#faq')} className="hover:text-white transition-colors cursor-pointer">{t('footer.faq')}</a>
              </div>
            </div>
          </div>

          {/* Column 4: Tic Tac Toe */}
          <div className="flex flex-col items-center md:items-end md:ml-auto w-full md:w-auto">
            <h3 className="text-[15px] font-medium text-[#a1a1aa] mb-5">{t('footer.tttTitle')}</h3>
            
            <div className="relative">
              <div className="grid grid-cols-3 grid-rows-3 w-[150px] h-[150px]">
                {board.map((square, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleClick(i)}
                    className={`flex items-center justify-center text-3xl font-light cursor-pointer select-none w-full h-full
                      ${i < 6 ? 'border-b border-white/20' : ''} 
                      ${i % 3 !== 2 ? 'border-r border-white/20' : ''}
                      ${!square && !winner ? 'hover:bg-white/5' : ''}
                      transition-colors overflow-hidden`}
                  >
                    <AnimatePresence>
                      {square === 'X' && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          className="text-white"
                        >
                          ✕
                        </motion.span>
                      )}
                      {square === 'O' && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          className="text-[#a1a1aa]"
                        >
                          ◯
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {(winner || isDraw) && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <p className="text-white text-sm font-bold mb-3">
                    {winner === 'X' ? t('footer.tttWin') : winner === 'O' ? t('footer.tttLose') : t('footer.tttDraw')}
                  </p>
                  <button 
                    onClick={resetGame}
                    className="text-xs bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                  >
                    {t('footer.tttPlayAgain')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-[#71717a]">
          <p className="font-medium">© 2026 <span className="text-white">WIKAK MONTAŻ</span></p>
          <p className="mt-2 md:mt-0 uppercase tracking-[0.15em] text-[11px] font-medium">VIDEO EDITING • CONTENT CREATION</p>
        </div>
      </div>
    </footer>
  );
}
