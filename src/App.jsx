import React, { useState, useEffect } from 'react';

// =====================================================================
// 🎮 QUESTION BANK
// Easily edit this section to add new categories or questions!
// 
// Structure:
// "Category Name": [
//    { diff: 1, q: "Prompt (100 pts)", a: "Answer" },
//    { diff: 2, q: "Prompt (200 pts)", a: "Answer" },
//    ... up to diff 5 (500 pts)
// ]
// The game will randomly select 5 categories, and randomly pick one 
// question per difficulty (diff) level for the board!
// =====================================================================
const QUESTION_BANK = {
  "Mobile Tech": [
    { diff: 1, q: "This power component degrades over time, is typically lithium-ion, and can swell if failing.", a: "What is a Battery?" },
    { diff: 1, q: "Built-in video capture device often located at the top bezel of a laptop screen.", a: "What is a Webcam?" },
    { diff: 2, q: "Apple's proprietary power and data connector used before the transition to USB-C.", a: "What is Lightning?" },
    { diff: 2, q: "A pen-like tool used for precise drawing or tapping on digitizer touchscreens.", a: "What is a Stylus?" },
    { diff: 3, q: "This short-range wireless technology requires a distance of a few centimeters and is used for tap-to-pay.", a: "What is NFC (Near-field communication)?" },
    { diff: 3, q: "Sharing a mobile device's cellular data connection with other devices via Wi-Fi.", a: "What is Tethering / Hotspot?" },
    { diff: 4, q: "Enterprise software used to monitor, manage, and secure employee mobile devices.", a: "What is MDM (Mobile Device Management)?" },
    { diff: 4, q: "This satellite-based system provides accurate location data to the device.", a: "What is GPS?" },
    { diff: 5, q: "This physical chip or embedded software authenticates a device on a cellular provider's network.", a: "What is a SIM / eSIM?" },
    { diff: 5, q: "A workplace policy that allows employees to use personal devices with enterprise security policies enforced.", a: "What is BYOD (Bring your own device)?" }
  ],
  "Net Protocols": [
    { diff: 1, q: "This translates human-readable URLs to IP addresses so your computer knows where to go.", a: "What is DNS?" },
    { diff: 1, q: "The secure, encrypted version of the protocol used for web browsing.", a: "What is HTTPS?" },
    { diff: 2, q: "This protocol automatically assigns IP addresses to clients joining a network.", a: "What is DHCP?" },
    { diff: 2, q: "This protocol is used for sending outgoing email on port 25.", a: "What is SMTP?" },
    { diff: 3, q: "Unlike TCP, this protocol is connectionless, fast, has no error checking, and is used for streaming.", a: "What is UDP?" },
    { diff: 3, q: "This protocol allows logging into remote Windows graphical interfaces using Port 3389.", a: "What is RDP (Remote Desktop Protocol)?" },
    { diff: 4, q: "This older, unencrypted remote command-line access protocol operates on port 23 and is considered insecure.", a: "What is Telnet?" },
    { diff: 4, q: "Used to access and maintain directory information, like Microsoft's Active Directory.", a: "What is LDAP?" },
    { diff: 5, q: "This spam management record tells receiving servers how to handle fake emails sent from your domain.", a: "What is DMARC?" },
    { diff: 5, q: "A framework (like RADIUS) used to securely control and track user access.", a: "What is AAA (Authentication, Authorization, Accounting)?" }
  ],
  "Hardware": [
    { diff: 1, q: "Volatile memory used for active tasks, known as SODIMM in laptops and DIMM in desktops.", a: "What is RAM?" },
    { diff: 1, q: "This storage device uses spinning magnetic platters, offering more storage for less money.", a: "What is a HDD (Hard Disk Drive)?" },
    { diff: 2, q: "This standard digital video and audio cable comes in both HDMI and this other format.", a: "What is DisplayPort?" },
    { diff: 2, q: "A heavily shielded copper cable used commonly for cable TV and internet delivery.", a: "What is Coaxial?" },
    { diff: 3, q: "This modern, flat form factor for Solid State Drives connects via NVMe/PCIe for massive speed.", a: "What is M.2?" },
    { diff: 3, q: "Installing RAM in pairs to double the memory bandwidth.", a: "What is a Dual-channel configuration?" },
    { diff: 4, q: "This RAID configuration is known as 'Mirroring' and provides safety by duplicating data.", a: "What is RAID 1?" },
    { diff: 4, q: "A chip on the motherboard that enables full disk encryption.", a: "What is a TPM (Trusted Platform Module)?" },
    { diff: 5, q: "This dedicated external appliance is used for managing cryptographic keys securely.", a: "What is an HSM (Hardware Security Module)?" },
    { diff: 5, q: "Cables with a fire-resistant jacket that don't emit toxic fumes, required in HVAC spaces.", a: "What is Plenum-rated cable?" }
  ],
  "Cloud & Virt": [
    { diff: 1, q: "An isolated, emulated computer running completely within your physical computer.", a: "What is a Virtual Machine (VM)?" },
    { diff: 1, q: "This type of cloud is offered over the public internet and shared by multiple organizations like AWS.", a: "What is a Public Cloud?" },
    { diff: 2, q: "The software that creates, runs, and manages virtual machines.", a: "What is a Hypervisor?" },
    { diff: 2, q: "A service model where the provider hosts and manages a fully functional application like Microsoft 365.", a: "What is SaaS (Software as a Service)?" },
    { diff: 3, q: "A lightweight alternative to VMs that isolates just the application and shares the host's OS kernel.", a: "What are Containers?" },
    { diff: 3, q: "Automatically mirroring files across local devices and cloud storage so data remains consistent.", a: "What is File Synchronization?" },
    { diff: 4, q: "A hypervisor that runs directly on the system's hardware without an underlying OS (Bare-metal).", a: "What is a Type 1 Hypervisor?" },
    { diff: 4, q: "The ability of a cloud environment to automatically and dynamically scale resources based on workload.", a: "What is Elasticity?" },
    { diff: 5, q: "An architecture where a single instance of software serves multiple distinct customers while keeping their data separated.", a: "What is Multitenancy?" },
    { diff: 5, q: "In cloud billing, this term refers to data flowing out of the cloud, which providers usually charge for.", a: "What is Egress?" }
  ],
  "Troubleshoot": [
    { diff: 1, q: "If you smell a burning odor from a computer, this is the very first thing you should do.", a: "What is Shut down immediately?" },
    { diff: 1, q: "A swollen one of these in a mobile device is a severe fire hazard and should be safely removed.", a: "What is a Battery?" },
    { diff: 2, q: "This common network issue results in an IP address starting with 169.254.x.x.", a: "What is an APIPA address / DHCP failure?" },
    { diff: 2, q: "The pattern of these sounds indicates a hardware failure detected before the video initializes.", a: "What are POST beeps?" },
    { diff: 3, q: "A faint, permanent ghost image left on older OLEDs or plasma displays.", a: "What is Display burn-in?" },
    { diff: 3, q: "Often called the 'click of death', this symptom points to the mechanical failure of a hard drive.", a: "What are Grinding/Clicking noises?" },
    { diff: 4, q: "A feature used to prioritize network traffic to ensure critical apps like VoIP have enough bandwidth.", a: "What is QoS (Quality of Service)?" },
    { diff: 4, q: "The drive's internal diagnostics predicting an impending failure, meaning you should back up immediately.", a: "What is a S.M.A.R.T. failure?" },
    { diff: 5, q: "A switch port rapidly changing states (up/down), indicating a faulty cable or duplex mismatch.", a: "What is Port flapping?" },
    { diff: 5, q: "Variable packet delay that destroys real-time traffic like voice calls.", a: "What is Jitter?" }
  ],
  "Printers": [
    { diff: 1, q: "This printer type uses a plastic powder called toner and requires a fuser.", a: "What is a Laser printer?" },
    { diff: 1, q: "This prints on both sides of the paper automatically.", a: "What is Duplexing?" },
    { diff: 2, q: "These need to be replaced if your printer is constantly experiencing paper jams or misfeeds.", a: "What are Pickup rollers?" },
    { diff: 2, q: "The glass plate on a multifunction device used for scanning single or fragile items.", a: "What is a Flatbed scanner?" },
    { diff: 3, q: "This type of printer uses heat-sensitive paper and is commonly used for printing receipts.", a: "What is a Thermal printer?" },
    { diff: 3, q: "If a printer is putting out garbled text, this is likely corrupted or incorrect on the computer.", a: "What is the Printer Driver?" },
    { diff: 4, q: "This security feature holds the print job in memory until the user enters a PIN at the printer.", a: "What is a Secured print?" },
    { diff: 4, q: "A clogged one of these will cause lines down the page on an inkjet printer.", a: "What is a Printhead?" },
    { diff: 5, q: "If you see double or 'echo' ghost images, it means this component isn't cleaning itself between rotations.", a: "What is the Imaging drum?" },
    { diff: 5, q: "An older printer driver language that treats pages as vectors for high-quality printing.", a: "What is Postscript?" }
  ]
};

// Helper: Shuffle array
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export default function App() {
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing'
  const [teams, setTeams] = useState([{ id: 1, name: 'Team 1', score: 0 }, { id: 2, name: 'Team 2', score: 0 }]);
  const [board, setBoard] = useState([]);
  const [activeCell, setActiveCell] = useState(null); // { catIndex, rowIndex, q, a, points }
  const [showAnswer, setShowAnswer] = useState(false);

  // Initialize a randomized board
  const generateBoard = () => {
    // 1. Pick 5 random categories
    const allCategories = Object.keys(QUESTION_BANK);
    const selectedCategories = shuffle(allCategories).slice(0, 5);

    // 2. Build columns
    const newBoard = selectedCategories.map(catName => {
      const categoryQuestions = QUESTION_BANK[catName];
      
      // For each difficulty (1 to 5), pick a random question
      const column = [1, 2, 3, 4, 5].map(diffLevel => {
        const availableQuestions = categoryQuestions.filter(q => q.diff === diffLevel);
        // Fallback to random if exact diff not found (shouldn't happen with our data)
        const pool = availableQuestions.length > 0 ? availableQuestions : categoryQuestions;
        const selectedQ = shuffle(pool)[0];
        
        return {
          points: diffLevel * 100,
          q: selectedQ.q,
          a: selectedQ.a,
          isAnswered: false
        };
      });

      return {
        category: catName,
        questions: column
      };
    });

    setBoard(newBoard);
    setGameState('playing');
  };

  const handleSetupChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index].name = value;
    setTeams(newTeams);
  };

  const addTeam = () => {
    setTeams([...teams, { id: Date.now(), name: `Team ${teams.length + 1}`, score: 0 }]);
  };

  const removeTeam = (index) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const startGame = () => {
    // Reset scores
    setTeams(teams.map(t => ({ ...t, score: 0 })));
    generateBoard();
  };

  const handleCellClick = (catIndex, rowIndex) => {
    const cell = board[catIndex].questions[rowIndex];
    if (!cell.isAnswered) {
      setActiveCell({ ...cell, catIndex, rowIndex });
      setShowAnswer(false);
    }
  };

  const handleScore = (teamIndex, isCorrect) => {
    const newTeams = [...teams];
    const points = activeCell.points;
    if (isCorrect) {
      newTeams[teamIndex].score += points;
    } else {
      newTeams[teamIndex].score -= points;
    }
    setTeams(newTeams);
  };

  const closeModal = () => {
    // Mark as answered
    const newBoard = [...board];
    newBoard[activeCell.catIndex].questions[activeCell.rowIndex].isAnswered = true;
    setBoard(newBoard);
    setActiveCell(null);
    setShowAnswer(false);
  };

  // -------------------------
  // RENDER: SETUP SCREEN
  // -------------------------
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-blue-900 text-white font-sans flex flex-col items-center justify-center p-6">
        <div className="bg-blue-950 p-8 rounded-xl shadow-2xl w-full max-w-md border-4 border-yellow-400">
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-6 text-center uppercase tracking-wider drop-shadow-md">
            IT Jeopardy Setup
          </h1>
          <div className="space-y-4 mb-6">
            {teams.map((team, index) => (
              <div key={team.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => handleSetupChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 rounded bg-blue-800 text-white border border-blue-600 focus:outline-none focus:border-yellow-400 font-semibold"
                  placeholder={`Student / Team ${index + 1}`}
                />
                <button 
                  onClick={() => removeTeam(index)}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded font-bold transition-colors"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={addTeam}
              className="flex-1 py-2 bg-blue-700 hover:bg-blue-600 rounded font-bold transition-colors"
            >
              + Add Team
            </button>
            <button 
              onClick={startGame}
              className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 rounded font-black uppercase tracking-wide transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // RENDER: GAME BOARD
  // -------------------------
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col font-sans p-4">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-3xl md:text-5xl font-black text-yellow-400 uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          Jeopardy
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setGameState('setup')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded shadow transition-colors"
          >
            Edit Teams
          </button>
          <button 
            onClick={generateBoard}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded shadow transition-colors"
          >
            New Board (Refresh)
          </button>
        </div>
      </header>

      {/* JEOPARDY GRID */}
      <div className="flex-1 grid grid-cols-5 gap-2 md:gap-4 mb-6">
        {/* Category Headers */}
        {board.map((col, i) => (
          <div key={`header-${i}`} className="bg-blue-800 text-white font-bold text-center text-sm md:text-xl uppercase flex items-center justify-center p-2 md:p-4 rounded-t border-b-4 border-black drop-shadow-md leading-tight">
            {col.category}
          </div>
        ))}
        
        {/* Questions Grid (Transposed for mapping) */}
        {[0, 1, 2, 3, 4].map(rowIndex => (
          <React.Fragment key={`row-${rowIndex}`}>
            {board.map((col, catIndex) => {
              const cell = col.questions[rowIndex];
              return (
                <div 
                  key={`cell-${catIndex}-${rowIndex}`}
                  onClick={() => handleCellClick(catIndex, rowIndex)}
                  className={`
                    flex items-center justify-center bg-blue-700 rounded shadow-inner border-2 border-blue-950 transition-all
                    ${cell.isAnswered ? 'opacity-20 cursor-default' : 'cursor-pointer hover:bg-blue-600 hover:scale-[1.02]'}
                  `}
                  style={{ minHeight: '80px' }}
                >
                  <span className={`text-2xl md:text-4xl font-black ${cell.isAnswered ? 'text-transparent' : 'text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'}`}>
                    ${cell.points}
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* SCOREBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-blue-950 text-white p-4 rounded-lg border-2 border-blue-500 text-center shadow-lg">
            <div className="font-bold text-lg mb-2 truncate">{team.name}</div>
            <div className={`text-3xl font-black ${team.score < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
              ${team.score}
            </div>
          </div>
        ))}
      </div>

      {/* QUESTION MODAL */}
      {activeCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-blue-900 w-full max-w-5xl rounded-xl border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.3)] flex flex-col max-h-[95vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-blue-700 bg-blue-950">
              <div className="text-yellow-400 font-bold text-xl uppercase tracking-wider">
                {board[activeCell.catIndex].category} for ${activeCell.points}
              </div>
              <button onClick={closeModal} className="text-white hover:text-red-400 font-bold text-2xl px-2">✕</button>
            </div>

            {/* Prompt Area */}
            <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase drop-shadow-lg mb-8">
                {activeCell.q}
              </h2>

              {!showAnswer ? (
                <button 
                  onClick={() => setShowAnswer(true)}
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-black text-xl uppercase rounded shadow-lg transition-transform hover:scale-105"
                >
                  Show Answer
                </button>
              ) : (
                <div className="animate-fade-in">
                  <h3 className="text-2xl md:text-4xl font-bold text-yellow-300 italic mb-8">
                    {activeCell.a}
                  </h3>
                </div>
              )}
            </div>

            {/* Scoring Area */}
            <div className="bg-blue-950 p-6 border-t border-blue-700">
              <h4 className="text-white text-center font-bold mb-4 uppercase tracking-wider text-sm opacity-80">Award Points</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {teams.map((team, index) => (
                  <div key={team.id} className="flex items-center bg-blue-900 rounded overflow-hidden border border-blue-600">
                    <button 
                      onClick={() => handleScore(index, false)}
                      className="px-4 py-2 bg-red-600/80 hover:bg-red-500 text-white font-bold transition-colors"
                      title="Incorrect (-)"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 font-bold text-white min-w-[120px] text-center truncate">
                      {team.name}
                    </div>
                    <button 
                      onClick={() => handleScore(index, true)}
                      className="px-4 py-2 bg-green-600/80 hover:bg-green-500 text-white font-bold transition-colors"
                      title="Correct (+)"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                 <button 
                    onClick={closeModal}
                    className="px-8 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 font-bold uppercase rounded transition-colors"
                  >
                    Done (Close Question)
                  </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}