import React, { useState, useEffect, useRef } from 'react';

// =====================================================================
// 🎓 COMPTIA A+ QUESTION BANK (60+ QUESTIONS)
// =====================================================================
const QUESTION_BANK = {
  "Mobile Devices": [
    { diff: 1, q: "This specific type of volatile memory is used in laptops and is physically smaller than a desktop's DIMM slots.", a: "What is SODIMM?" },
    { diff: 1, q: "This volatile storage component is permanently soldered to smartphone motherboards and cannot be upgraded.", a: "What is soldered RAM?" },
    { diff: 2, q: "This short-range wireless technology operates within a few centimeters and is typically used for tap-to-pay services.", a: "What is NFC (Near-Field Communication)?" },
    { diff: 2, q: "Laptop antennas are typically routed through this physical location to get the absolute best wireless signal reception.", a: "What is the display bezel / display housing?" },
    { diff: 3, q: "If a mobile device battery begins to do this, it represents a severe fire hazard and must be safely removed immediately.", a: "What is swelling / bloating?" },
    { diff: 3, q: "This fragile, flat cable connects a laptop's keyboard to the motherboard underneath the outer bezel.", a: "What is a keyboard ribbon cable?" },
    { diff: 4, q: "This enterprise software is used by IT departments to monitor, manage, track, and secure employee-owned or corporate mobile devices.", a: "What is MDM (Mobile Device Management)?" },
    { diff: 4, q: "This pen-like accessory operates on laptop digitizers to allow fine drawing, handwriting, and precise touch commands.", a: "What is a Stylus?" },
    { diff: 5, q: "This is the very first step out of the 5 required steps to successfully pair a Bluetooth accessory to a device.", a: "What is enabling Bluetooth on the device?" },
    { diff: 5, q: "This workplace security policy allows workers to bring personal smartphones, though they must accept remote administration policies.", a: "What is BYOD (Bring Your Own Device)?" }
  ],
  "Networking": [
    { diff: 1, q: "This protocol translates human-readable URLs like google.com into IP addresses and operates on Port 53.", a: "What is DNS?" },
    { diff: 1, q: "This secure, encrypted transport protocol is used to access the web safely over port 443.", a: "What is HTTPS?" },
    { diff: 2, q: "This type of IP address is automatically assigned (169.254.x.x) when a device cannot reach a DHCP server, resulting in local-only access.", a: "What is an APIPA address?" },
    { diff: 2, q: "This protocol is responsible for automatically assigning dynamic IP addresses, subnet masks, and default gateways to clients on boot.", a: "What is DHCP?" },
    { diff: 3, q: "Unlike TCP, this transport protocol is connectionless, offers no error checking, and is optimized for speed in streaming and VoIP.", a: "What is UDP?" },
    { diff: 3, q: "This desktop connection protocol operates on port 3389, allowing full remote control over Windows computers.", a: "What is RDP (Remote Desktop Protocol)?" },
    { diff: 4, q: "This security appliance combines a traditional firewall, anti-malware, and web content filtering all into a single physical unit.", a: "What is a UTM (Unified Threat Management) appliance?" },
    { diff: 4, q: "This highly insecure command-line protocol operates on port 23, sending all remote administration keystrokes in cleartext.", a: "What is Telnet?" },
    { diff: 5, q: "This specific type of high-speed network is isolated and dedicated strictly to connecting corporate storage arrays to backup servers.", a: "What is a SAN (Storage Area Network)?" },
    { diff: 5, q: "This modern DNS security record helps prevent domain name spoofing and lists authorized outbound email servers.", a: "What is a DMARC / SPF record?" }
  ],
  "Hardware": [
    { diff: 1, q: "This type of cable jacket is required by fire code in air ducts and dropped ceilings because it doesn't emit toxic fumes when burned.", a: "What is Plenum-rated?" },
    { diff: 1, q: "This classic mechanical storage device uses spinning magnetic platters to store heavy amounts of archival data.", a: "What is a Hard Disk Drive (HDD)?" },
    { diff: 2, q: "This display panel technology provides the absolute best viewing angles and color reproduction compared to budget TN panels.", a: "What is IPS (In-Plane Switching)?" },
    { diff: 2, q: "This external digital audio/video connection interface is standard on GPUs and supports high refresh rates, distinct from HDMI.", a: "What is DisplayPort?" },
    { diff: 3, q: "This motherboard security chip enables full disk BitLocker encryption and verifies the physical hardware's boot sector.", a: "What is a TPM (Trusted Platform Module)?" },
    { diff: 3, q: "This fast storage interface allows modern M.2 solid-state drives to bypass slow SATA ports and run directly over the PCIe bus.", a: "What is NVMe?" },
    { diff: 4, q: "This RAID level provides storage safety through mirroring data across exactly two physical drives, offering no striping advantages.", a: "What is RAID 1?" },
    { diff: 4, q: "This RAID level stripes data across three or more physical hard drives, incorporating parity blocks for single-drive failure recovery.", a: "What is RAID 5?" },
    { diff: 5, q: "This highly specialized type of RAM can detect and instantly correct data corruption errors on the fly within server motherboards.", a: "What is ECC RAM?" },
    { diff: 5, q: "This specialized hardware security appliance is designed to safely hold, process, and manage master cryptographic keys.", a: "What is an HSM (Hardware Security Module)?" }
  ],
  "Cloud & Virtualization": [
    { diff: 1, q: "This cloud service model handles raw hardware, hypervisors, and storage, leaving you responsible for managing the OS and software licenses.", a: "What is IaaS (Infrastructure as a Service)?" },
    { diff: 1, q: "This cloud service model provides a fully packaged, ready-to-run software suite over the web, like Google Workspace or Microsoft 365.", a: "What is SaaS (Software as a Service)?" },
    { diff: 2, q: "This type of hypervisor runs directly on bare system hardware without needing an underlying commercial operating system first.", a: "What is a Type 1 (Bare-metal) Hypervisor?" },
    { diff: 2, q: "This hypervisor type runs as a standard desktop application on top of an existing host OS (like VirtualBox running inside Windows).", a: "What is a Type 2 Hypervisor?" },
    { diff: 3, q: "This benefit of cloud computing allows servers to instantly scale up or down dynamically based on user workloads.", a: "What is Elasticity?" },
    { diff: 3, q: "This cloud deployment model features hardware shared strictly among specific related groups, such as several local school districts.", a: "What is a Community Cloud?" },
    { diff: 4, q: "Unlike virtual machines, these lightweight virtualization alternatives share the host machine's OS kernel directly.", a: "What are Containers?" },
    { diff: 4, q: "This cloud service model provides a hosted development suite, allowing program developers to deploy custom code instantly.", a: "What is PaaS (Platform as a Service)?" },
    { diff: 5, q: "In cloud subscription billing, this term refers to any files or data flowing OUT of the cloud provider's network, which often triggers fees.", a: "What is Egress?" },
    { diff: 5, q: "This architecture design allows a single physical software installation to serve multiple independent clients safely.", a: "What is Multitenancy?" }
  ],
  "Troubleshooting": [
    { diff: 1, q: "If a computer's system date and time keep resetting back to 1999 on boot, this internal hardware coin cell needs replacement.", a: "What is the CMOS battery?" },
    { diff: 1, q: "When you smell a burning chemical odor coming from inside a running PC tower, this is your immediate first step.", a: "What is shut down the PC and unplug the power cable?" },
    { diff: 2, q: "A repetitive clicking or grinding sound (known as the 'click of death') indicates the failure of this mechanical device.", a: "What is a mechanical Hard Disk Drive (HDD)?" },
    { diff: 2, q: "This simple pattern of audio tones is played by motherboards before video card initialization to signal boot failures.", a: "What are POST beep codes?" },
    { diff: 3, q: "This router and OS configuration feature prioritizes real-time traffic like VoIP calls to prevent lag or audio dropouts.", a: "What is QoS (Quality of Service)?" },
    { diff: 3, q: "These cylindrical motherboard power components should be visually checked for bulging or brown residue if a PC won't POST.", a: "What are capacitors (capacitor swelling)?" },
    { diff: 4, q: "This handheld device is plugged into both ends of a newly crimped network cord to verify pin layout and wire continuity.", a: "What is a Cable Tester?" },
    { diff: 4, q: "This hard drive health-reporting technology alerts operating systems of an impending mechanical drive failure.", a: "What is S.M.A.R.T.?" },
    { diff: 5, q: "A switch port rapidly cycling between an UP and DOWN status is suffering from this common physical layer problem.", a: "What is Port Flapping?" },
    { diff: 5, q: "This packet delay variance ruins real-time audio calls, making conversations sound scattered or heavily digitised.", a: "What is Jitter?" }
  ],
  "Printer Issues": [
    { diff: 1, q: "If a network printer prints out completely garbled, unreadable wingding characters, this computer software item is likely corrupt.", a: "What is the printer driver?" },
    { diff: 1, q: "This printer type uses fine plastic powder and a high-heat component to bake image prints onto a sheet.", a: "What is a Laser printer?" },
    { diff: 2, q: "Worn out, hardened, or slick versions of these small rubber parts are the leading cause of constant tray paper jams.", a: "What are pickup rollers?" },
    { diff: 2, q: "You should restart this Windows system service if a printer queue suddenly stalls and blocks all incoming jobs.", a: "What is the Print Spooler?" },
    { diff: 3, q: "Faint ghost or double images printed repeatedly down a laser page point to a failing fuser or a damaged one of these units.", a: "What is the Imaging Drum?" },
    { diff: 3, q: "This printer style uses thermal-coated paper and is heavily utilized for cash register transaction receipts.", a: "What is a Thermal printer?" },
    { diff: 4, q: "Thin black streaks running straight down the pages of a laser print job point to a dirty one of these wires.", a: "What is a Primary Corona Wire?" },
    { diff: 4, q: "This security printing feature holds active print jobs in printer memory until a user physically scans a badge or enters a PIN.", a: "What is Secure / Held print?" },
    { diff: 5, q: "If toner rub-off occurs when light friction is applied to a newly printed sheet, this heating unit has failed.", a: "What is the Fuser assembly?" },
    { diff: 5, q: "This wasted material tray in high-capacity copy/print centers will stop hole-punch printing entirely once it is full.", a: "What is the hole-punch waste bin?" }
  ]
};

// =====================================================================
// 🏆 FINAL JEOPARDY QUESTION BANK
// =====================================================================
const FINAL_JEOPARDY_BANK = [
  { 
    cat: "Enterprise Troubleshooting Methodology", 
    q: "This step is the absolute FIRST and most crucial stage of the official CompTIA 6-step troubleshooting methodology.", 
    a: "What is: Identify the problem?" 
  },
  { 
    cat: "Physical Storage Networks", 
    q: "This system network protocol encapsulates SCSI commands inside standard TCP/IP packets to facilitate block-level storage across typical Ethernet environments.", 
    a: "What is iSCSI?" 
  },
  { 
    cat: "Advanced Network Diagnostics", 
    q: "This command-line security tool replaces the aging 'nslookup' utility on modern machines to query domain name resolution and identify record configurations.", 
    a: "What is dig?" 
  }
];

// Helper: Shuffle array
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export default function App() {
  const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing' | 'final'
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', score: 0, finalWager: 0, finalCorrect: null }, 
    { id: 2, name: 'Team 2', score: 0, finalWager: 0, finalCorrect: null }
  ]);
  const [board, setBoard] = useState([]);
  const [activeCell, setActiveCell] = useState(null); // { catIndex, rowIndex, q, a, points, isDailyDouble }
  const [showAnswer, setShowAnswer] = useState(false);

  // Daily Double State variables
  const [dailyDoubleRevealed, setDailyDoubleRevealed] = useState(false);
  const [customWager, setCustomWager] = useState(100);

  // Final Jeopardy State variables
  const [finalStep, setFinalStep] = useState('category'); // 'category' | 'clue' | 'answer' | 'results'
  const [finalClue, setFinalClue] = useState(null);
  const [timerCount, setTimerCount] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Initialize a randomized board using the expanded bank
  const generateBoard = () => {
    const allCategories = Object.keys(QUESTION_BANK);
    
    // 1. Pick 5 out of our available categories randomly to build a 5-column grid
    const selectedCategories = shuffle(allCategories).slice(0, 5);

    // Pick EXACTLY ONE cell coordinate to be the Daily Double
    const ddCol = Math.floor(Math.random() * 5);
    const ddRow = Math.floor(Math.random() * 5);

    const newBoard = selectedCategories.map((catName, catIndex) => {
      const categoryQuestions = QUESTION_BANK[catName];
      
      // For each difficulty tier ($100 to $500), pick ONE question at random
      const column = [1, 2, 3, 4, 5].map((diffLevel, rowIndex) => {
        const availableQuestions = categoryQuestions.filter(q => q.diff === diffLevel);
        const pool = availableQuestions.length > 0 ? availableQuestions : categoryQuestions;
        const selectedQ = shuffle(pool)[0];
        
        return {
          points: diffLevel * 100,
          q: selectedQ.q,
          a: selectedQ.a,
          isAnswered: false,
          isDailyDouble: catIndex === ddCol && rowIndex === ddRow
        };
      });

      return {
        category: catName,
        questions: column
      };
    });

    setBoard(newBoard);

    // Pick a random Final Jeopardy question
    setFinalClue(shuffle(FINAL_JEOPARDY_BANK)[0]);
    setGameState('playing');
  };

  const handleSetupChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index].name = value;
    setTeams(newTeams);
  };

  const addTeam = () => {
    setTeams([...teams, { id: Date.now(), name: `Team ${teams.length + 1}`, score: 0, finalWager: 0, finalCorrect: null }]);
  };

  const removeTeam = (index) => {
    if (teams.length > 1) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const startGame = () => {
    setTeams(teams.map(t => ({ ...t, score: 0, finalWager: 0, finalCorrect: null })));
    generateBoard();
  };

  const handleCellClick = (catIndex, rowIndex) => {
    const cell = board[catIndex].questions[rowIndex];
    if (!cell.isAnswered) {
      setActiveCell({ ...cell, catIndex, rowIndex });
      setShowAnswer(false);
      setDailyDoubleRevealed(false);
      setCustomWager(cell.points); // Set initial default wager to standard tile value
    }
  };

  // Score adjustments (normal or Daily Double)
  const handleScore = (teamIndex, isCorrect) => {
    const newTeams = [...teams];
    // If it's a daily double, use custom wager, otherwise use default point values
    const pointImpact = activeCell.isDailyDouble ? Number(customWager) : activeCell.points;

    if (isCorrect) {
      newTeams[teamIndex].score += pointImpact;
    } else {
      newTeams[teamIndex].score -= pointImpact;
    }
    setTeams(newTeams);
  };

  const closeModal = () => {
    const newBoard = [...board];
    newBoard[activeCell.catIndex].questions[activeCell.rowIndex].isAnswered = true;
    setBoard(newBoard);
    setActiveCell(null);
    setShowAnswer(false);
    setDailyDoubleRevealed(false);
  };

  // Helper to check if board is completely cleared
  const isBoardCleared = () => {
    if (board.length === 0) return false;
    return board.every(col => col.questions.every(q => q.isAnswered));
  };

  // --- Final Jeopardy Timing Functions ---
  const startTimer = () => {
    if (timerRunning) return;
    setTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimerCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimerRunning(false);
    setTimerCount(30);
  };

  const triggerFinalJeopardy = () => {
    setGameState('final');
    setFinalStep('category');
    resetTimer();
  };

  // Score handlers for final jeopardy wagers
  const handleFinalWagerChange = (index, value) => {
    const newTeams = [...teams];
    newTeams[index].finalWager = Number(value);
    setTeams(newTeams);
  };

  const applyFinalScoring = () => {
    const newTeams = teams.map(team => {
      let newScore = team.score;
      if (team.finalCorrect === true) {
        newScore += team.finalWager;
      } else if (team.finalCorrect === false) {
        newScore -= team.finalWager;
      }
      return { ...team, score: newScore };
    });
    setTeams(newTeams);
    setFinalStep('results');
  };

  const setTeamFinalStatus = (index, isCorrect) => {
    const newTeams = [...teams];
    newTeams[index].finalCorrect = isCorrect;
    setTeams(newTeams);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // -------------------------------------------------------------
  // RENDER 1: Setup Window
  // -------------------------------------------------------------
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-blue-900 text-white font-sans flex flex-col items-center justify-center p-6">
        <div className="bg-blue-950 p-8 rounded-xl shadow-2xl w-full max-w-md border-4 border-yellow-400">
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-6 text-center uppercase tracking-wider drop-shadow-md">
            A+ Exam Review Setup
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

  // -------------------------------------------------------------
  // RENDER 2: Final Jeopardy Layout Screen
  // -------------------------------------------------------------
  if (gameState === 'final') {
    return (
      <div className="min-h-screen bg-blue-900 text-white font-sans flex flex-col p-6 items-center justify-center">
        <div className="bg-blue-950 w-full max-w-5xl rounded-2xl border-8 border-yellow-400 shadow-2xl p-8 flex flex-col items-center">
          
          <h1 className="text-4xl md:text-6xl font-black text-yellow-400 uppercase tracking-widest text-center mb-8 drop-shadow-md">
            ⭐ Final Jeopardy ⭐
          </h1>

          {/* Step 1: Category Reveal */}
          {finalStep === 'category' && (
            <div className="text-center space-y-8 py-10">
              <div>
                <p className="text-xl uppercase tracking-wider text-blue-300 font-bold mb-2">Category</p>
                <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase drop-shadow">
                  {finalClue?.cat}
                </h2>
              </div>
              <p className="text-lg text-gray-300 max-w-xl mx-auto italic">
                Discuss with your teams and verbally state your wagers to the host. Write them down securely. Once all wagers are placed, reveal the question.
              </p>
              <button 
                onClick={() => setFinalStep('clue')}
                className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black text-2xl uppercase rounded-lg shadow-lg tracking-wider transition-transform hover:scale-105"
              >
                Reveal Clue
              </button>
            </div>
          )}

          {/* Step 2: Show Clue & Timer */}
          {finalStep === 'clue' && (
            <div className="text-center space-y-8 py-4 w-full flex flex-col items-center">
              <div className="border border-blue-800 bg-blue-900 p-8 rounded-xl max-w-3xl w-full shadow-inner">
                <p className="text-yellow-400 font-bold uppercase tracking-wider mb-4">Category: {finalClue?.cat}</p>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  {finalClue?.q}
                </h2>
              </div>

              {/* Countdown Timer Display */}
              <div className="flex items-center gap-6 mt-4">
                <div className={`text-6xl font-black rounded-full w-24 h-24 flex items-center justify-center border-4 ${timerCount < 10 ? 'text-red-500 border-red-500 animate-pulse' : 'text-yellow-400 border-yellow-400'}`}>
                  {timerCount}s
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={startTimer}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded"
                  >
                    Start Timer
                  </button>
                  <button 
                    onClick={resetTimer}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setFinalStep('answer')}
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black text-xl uppercase rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  Show Answer
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Reveal Answer & Setup Scoring */}
          {finalStep === 'answer' && (
            <div className="w-full space-y-8">
              <div className="text-center py-6">
                <p className="text-blue-300 font-bold uppercase tracking-wider">Correct Response</p>
                <h2 className="text-3xl md:text-5xl font-black text-yellow-300 italic mt-2">
                  {finalClue?.a}
                </h2>
              </div>

              {/* Scoring Panel */}
              <div className="bg-blue-900 p-6 rounded-xl border border-blue-800">
                <h3 className="text-xl font-bold mb-4 text-center text-white border-b border-blue-700 pb-2">Record final wagers and status</h3>
                <div className="space-y-6">
                  {teams.map((team, index) => (
                    <div key={team.id} className="flex flex-wrap items-center justify-between gap-4 p-4 bg-blue-950 rounded border border-blue-800">
                      <div>
                        <div className="font-black text-lg text-yellow-400">{team.name}</div>
                        <div className="text-sm text-gray-300">Starting Score: ${team.score}</div>
                      </div>

                      {/* Enter wager */}
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold text-blue-300">Wager Amount:</label>
                        <input 
                          type="number"
                          value={team.finalWager}
                          onChange={(e) => handleFinalWagerChange(index, e.target.value)}
                          max={Math.max(team.score, 0)}
                          className="w-28 px-3 py-1.5 rounded bg-blue-900 text-white font-bold border border-blue-700"
                        />
                      </div>

                      {/* Correct or Incorrect toggle */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setTeamFinalStatus(index, true)}
                          className={`px-4 py-2 font-bold rounded transition-colors ${team.finalCorrect === true ? 'bg-green-500 text-white ring-4 ring-white' : 'bg-green-950 text-green-300 hover:bg-green-900'}`}
                        >
                          Correct (+)
                        </button>
                        <button 
                          onClick={() => setTeamFinalStatus(index, false)}
                          className={`px-4 py-2 font-bold rounded transition-colors ${team.finalCorrect === false ? 'bg-red-500 text-white ring-4 ring-white' : 'bg-red-950 text-red-300 hover:bg-red-900'}`}
                        >
                          Incorrect (-)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  onClick={applyFinalScoring}
                  className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black text-2xl uppercase rounded-lg shadow-xl tracking-wider"
                >
                  Calculate Final Scores
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Final Standings & Winner Board */}
          {finalStep === 'results' && (
            <div className="text-center space-y-8 py-8 w-full">
              <h2 className="text-4xl font-extrabold text-yellow-400">Final Standings</h2>
              
              <div className="max-w-md mx-auto space-y-4">
                {[...teams].sort((a, b) => b.score - a.score).map((team, idx) => (
                  <div 
                    key={team.id} 
                    className={`p-6 rounded-xl border flex justify-between items-center ${idx === 0 ? 'bg-yellow-500/20 border-yellow-400 scale-105' : 'bg-blue-900/60 border-blue-800'}`}
                  >
                    <div className="text-left">
                      <span className="font-extrabold text-xl text-white">
                        {idx === 0 ? '👑 ' : ''}{team.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-yellow-400">${team.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center mt-12">
                <button 
                  onClick={startGame}
                  className="px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded"
                >
                  Rematch
                </button>
                <button 
                  onClick={() => setGameState('setup')}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold rounded"
                >
                  Setup Screen
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER 3: Standard Play Mode
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col font-sans p-4 text-white">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-yellow-400 uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            CompTIA Jeopardy
          </h1>
          {/* Quick status on whether game has a pending daily double or has final triggered */}
          <p className="text-xs text-blue-300 mt-1">1 Daily Double hidden in the board below!</p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <button 
            onClick={() => setGameState('setup')}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded shadow transition-colors"
          >
            Edit Teams
          </button>
          <button 
            onClick={generateBoard}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-blue-200 font-bold rounded shadow transition-colors border border-blue-700"
          >
            New Board (Refresh)
          </button>
          <button 
            onClick={triggerFinalJeopardy}
            className={`px-4 py-2 font-black rounded shadow transition-colors uppercase tracking-wider ${isBoardCleared() ? 'bg-yellow-500 hover:bg-yellow-400 text-blue-900 ring-4 ring-yellow-400' : 'bg-red-600 hover:bg-red-500 text-white text-sm'}`}
          >
            {isBoardCleared() ? "Final Jeopardy ➔" : "Force Final Jeopardy ➔"}
          </button>
        </div>
      </header>

      {/* JEOPARDY BOARD */}
      <div className="flex-1 grid grid-cols-5 gap-2 md:gap-4 mb-6">
        {board.map((col, i) => (
          <div key={`header-${i}`} className="bg-blue-800 text-white font-bold text-center text-xs md:text-lg uppercase flex items-center justify-center p-2 md:p-4 rounded-t border-b-4 border-black drop-shadow-md leading-tight">
            {col.category}
          </div>
        ))}
        
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
                  style={{ minHeight: '90px' }}
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

      {/* POP-UP ACTIVE QUESTION OR DAILY DOUBLE MODAL */}
      {activeCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          
          {/* Daily Double Splash Screen Pre-State */}
          {activeCell.isDailyDouble && !dailyDoubleRevealed ? (
            <div className="bg-blue-950 w-full max-w-2xl rounded-2xl border-8 border-yellow-400 shadow-2xl p-8 flex flex-col items-center justify-center text-center animate-bounce">
              <h2 className="text-5xl md:text-7xl font-black text-yellow-400 uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                DAILY DOUBLE!
              </h2>
              <p className="text-xl text-blue-200 mt-4 max-w-md">
                This question is worth whatever your team wagers. Discuss your wager verbally with the host!
              </p>
              
              {/* Score wagers layout panel */}
              <div className="mt-8 p-4 bg-blue-900 rounded-lg w-full border border-blue-700">
                <label className="block text-sm font-bold text-yellow-400 mb-2 uppercase">Wager Amount ($)</label>
                <input 
                  type="number" 
                  value={customWager} 
                  onChange={(e) => setCustomWager(e.target.value)}
                  className="text-3xl text-center font-black rounded-lg py-2 px-4 text-blue-950 w-48 focus:outline-none border-4 border-yellow-400"
                />
              </div>

              <button 
                onClick={() => setDailyDoubleRevealed(true)}
                className="mt-8 px-10 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black text-xl uppercase rounded-lg shadow-md transition-transform hover:scale-105"
              >
                Proceed to Clue
              </button>
            </div>
          ) : (
            
            /* Main Question Display View */
            <div className="bg-blue-900 w-full max-w-5xl rounded-xl border-4 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.3)] flex flex-col max-h-[95vh] overflow-hidden">
              
              <div className="flex justify-between items-center p-4 border-b border-blue-700 bg-blue-950">
                <div className="text-yellow-400 font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                  {activeCell.isDailyDouble && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Daily Double</span>}
                  {board[activeCell.catIndex].category} for {activeCell.isDailyDouble ? `$${customWager} (Wager)` : `$${activeCell.points}`}
                </div>
                <button onClick={closeModal} className="text-white hover:text-red-400 font-bold text-2xl px-2">✕</button>
              </div>

              <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight uppercase drop-shadow-lg mb-8">
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
                    <h3 className="text-xl md:text-3xl font-bold text-yellow-300 italic mb-8">
                      {activeCell.a}
                    </h3>
                  </div>
                )}
              </div>

              {/* SCORING PANEL */}
              <div className="bg-blue-950 p-6 border-t border-blue-700">
                <h4 className="text-white text-center font-bold mb-4 uppercase tracking-wider text-sm opacity-80">
                  {activeCell.isDailyDouble ? `Award/Subtract Wagered points ($${customWager})` : `Award Points ($${activeCell.points})`}
                </h4>
                <div className="flex flex-wrap gap-4 justify-center">
                  {teams.map((team, index) => (
                    <div key={team.id} className="flex items-center bg-blue-900 rounded overflow-hidden border border-blue-600">
                      <button 
                        onClick={() => handleScore(index, false)}
                        className="px-4 py-2 bg-red-600/80 hover:bg-red-500 text-white font-bold transition-colors"
                        title="Subtract point value"
                      >
                        -
                      </button>
                      <div className="px-4 py-2 font-bold text-white min-w-[120px] text-center truncate">
                        {team.name}
                      </div>
                      <button 
                        onClick={() => handleScore(index, true)}
                        className="px-4 py-2 bg-green-600/80 hover:bg-green-500 text-white font-bold transition-colors"
                        title="Add point value"
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
          )}

        </div>
      )}
    </div>
  );
}
