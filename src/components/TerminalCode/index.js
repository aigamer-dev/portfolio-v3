import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import './styles/TerminalCode.css';
import { personalInfo } from '../../data';
import { humanReadableDate } from '../../utils/date';
import { helpString, terminalCommands, terminalData } from '../../data/terminal';

const TerminalCode = () => {
  // Basic state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOrb] = useState(true);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lastTabTime, setLastTabTime] = useState(0);
  const [tabCount, setTabCount] = useState(0);

  // Refs
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Terminal data
  const availableCommands = useMemo(() =>
    terminalCommands
    , []);

  const commandData = useMemo(() => ({
    about: terminalData.userMemo.about,

    skills: `🛠️ Technical Skills:

Languages:
├── Python, Java, C++
├── HTML5, CSS3
└── React.js & JavaScript

Framework & Libraries:
├── Django, FastAPI 
├── Django REST Framework, Flask, React
└── TensorFlow, PyTorch, OpenCV, TorchAudio

DevOps & Cloud Tools:
├── Docker, AWS, Git
├── CI/CD (GitHub Actions), Postman
└── gunicorn, Kafka, Celery

Others:
├── Pandas, NumPy
├── Matplotlib, Markdown
└── Linux, Windows, Raspberry-pi

Currently exploring:
├── Flutter & Dart
├── Cloudflare DNS & Rules
└── Go (Golang)
`,

    experience: `💼 Professional Experience:
    ${personalInfo.about.experience.works.map(work => {
      const fromDate = humanReadableDate(work.duration.from);
      const toDate = work.duration.to ? humanReadableDate(work.duration.to) : 'Present';
      return `
      ${work.icon} ${work.role} | ${work.org.name}
      📅 ${fromDate} - ${toDate}
    `;
    }).join('')}
`,

    contact: `📬 Let's Connect!

📧 Email: hariharan@aigamer.dev
💼 LinkedIn: linkedin.com/in/aigamer-dev/
🐙 GitHub: github.com/AIGamer28100
🌐 Portfolio: aigamer.dev / aigamer.in
📱 X: @aigamer_dev

💬 Open for:
• Full-time opportunities
• Freelance projects  
• Technical discussions
• Collaboration on open source

Feel free to reach out! I usually respond within 24 hours.`,

    help: `🔥 Available Commands:
    ${helpString}
Tip: Use Tab for auto-completion!
`,

    whoami: `${personalInfo.name} - ${personalInfo.title}`,
  }), []);


  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Prevent body scroll when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  // Focus input when switching to interactive mode
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  // Focus input on component mount if in interactive mode
  useEffect(() => {
    if (inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  });

  // Command processing function
  const executeCommand = useCallback((command) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Add command to history
    setTerminalHistory(prev => [
      ...prev,
      { type: 'command', command, directory: currentDirectory }
    ]);

    let output = '';

    // Process command
    if (trimmedCommand === 'clear' || trimmedCommand === 'cls') {
      setTerminalHistory([]);
      return;
    } else if (trimmedCommand.startsWith('echo')) {
      output = command.slice(5); // Get text after 'echo '
      // show help if no text is provided
      if (!output.trim()) output = 'Usage: echo [text]';
      setTerminalHistory(prev => [
        ...prev,
        { type: 'output', output }
      ]);
      return;
    } else if (commandData[trimmedCommand]) {
      output = commandData[trimmedCommand];
    } else if (trimmedCommand === '') {
      return;
    } else {
      output = `Command not found: ${trimmedCommand}. Type 'help' for available commands.`;
    }

    // Add output to history
    if (output) {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'output', output }
      ]);
    }
  }, [currentDirectory, commandData]);

  // Auto-completion function
  const getSuggestions = useCallback((input) => {
    if (!input) return [];

    const matches = availableCommands.filter(cmd =>
      cmd.toLowerCase().startsWith(input.toLowerCase())
    );

    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);

    return matches;
  }, [availableCommands]);

  // Find common prefix of suggestions
  const getCommonPrefix = useCallback((matches) => {
    if (matches.length === 0) return '';
    if (matches.length === 1) return matches[0];

    let prefix = matches[0];
    for (let i = 1; i < matches.length; i++) {
      while (matches[i].indexOf(prefix) !== 0 && prefix.length > 0) {
        prefix = prefix.substring(0, prefix.length - 1);
      }
    }
    return prefix;
  }, []);

  // Enhanced tab completion function
  const handleTabCompletion = useCallback((input) => {
    const matches = availableCommands.filter(cmd =>
      cmd.toLowerCase().startsWith(input.toLowerCase())
    );

    if (matches.length === 0) {
      return { completed: input, showOptions: false, matches: [] };
    }

    if (matches.length === 1) {
      return { completed: matches[0] + ' ', showOptions: false, matches };
    }

    const commonPrefix = getCommonPrefix(matches);
    return {
      completed: commonPrefix,
      showOptions: input === commonPrefix,
      matches
    };
  }, [availableCommands, getCommonPrefix]);

  // Event handlers
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setCurrentInput(value);

    // Reset tab count when user types
    setTabCount(0);

    // Get suggestions but don't show them by default
    if (value.trim()) {
      getSuggestions(value.trim());
      setShowSuggestions(false); // Only show on double Tab
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [getSuggestions]);

  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        setTabCount(0); // Reset tab count
        if (currentInput.trim()) {
          executeCommand(currentInput.trim());
          setCommandHistory(prev => [...prev, currentInput.trim()]);
          setCurrentInput('');
          setHistoryIndex(-1);
        }
        setSuggestions([]);
        setShowSuggestions(false);
        break;

      case 'Tab':
        e.preventDefault();
        const now = Date.now();
        const currentTabTime = now;

        // Check if this is a double Tab (within 500ms)
        if (currentTabTime - lastTabTime < 500) {
          setTabCount(prev => prev + 1);
        } else {
          setTabCount(1);
        }

        setLastTabTime(currentTabTime);

        const trimmedInput = currentInput.trim();
        if (trimmedInput) {
          const result = handleTabCompletion(trimmedInput);

          if (tabCount >= 1 && result.matches.length > 1) {
            // Double Tab - show all options
            setSuggestions(result.matches);
            setShowSuggestions(true);

            // Add completion output to terminal history like real terminal
            setTerminalHistory(prev => [
              ...prev,
              { type: 'command', command: trimmedInput, directory: currentDirectory },
              { type: 'output', output: result.matches.join('  ') }
            ]);
            setCurrentInput('');
          } else if (result.completed !== trimmedInput) {
            // Single Tab - complete as much as possible
            setCurrentInput(result.completed);
            setSuggestions([]);
            setShowSuggestions(false);
          } else if (result.matches.length === 1) {
            // Exact match - complete with space
            setCurrentInput(result.completed);
            setSuggestions([]);
            setShowSuggestions(false);
          }
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        setTabCount(0); // Reset tab count
        if (commandHistory.length > 0) {
          const newIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
          setSuggestions([]);
          setShowSuggestions(false);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        setTabCount(0); // Reset tab count
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
          setSuggestions([]);
          setShowSuggestions(false);
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setCurrentInput('');
        }
        break;

      case 'Escape':
        e.preventDefault();
        setSuggestions([]);
        setShowSuggestions(false);
        setTabCount(0);
        break;

      default:
        break;
    }
  }, [currentInput, commandHistory, historyIndex, executeCommand, handleTabCompletion, tabCount, lastTabTime, currentDirectory, setTerminalHistory]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setCurrentInput(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const handleRestart = useCallback(() => {
    // Red button action - reload the component
    setTerminalHistory([]);
    setCurrentInput('');
    setCurrentDirectory('~');
    setCommandHistory([]);
    setHistoryIndex(-1);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsFullscreen(false);
  }, []);

  return (
    <>
      <div className={`terminal-code-container ${isFullscreen ? 'fullscreen' : ''}`}>
        <motion.div
          className="terminal-container"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-controls">
              <motion.button
                className="terminal-control close"
                onClick={handleRestart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Restart Terminal"
              />
              <motion.button
                className="terminal-control minimize"
                onClick={handleFullscreen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Toggle Fullscreen"
              />
            </div>
            <div className="terminal-title">
              Interactive Terminal
            </div>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body" ref={terminalBodyRef}>
            {/* Interactive Mode - Terminal Interface */}
            {terminalHistory.map((entry, index) => (
              <div key={index} className="terminal-line">
                {entry.type === 'command' ? (
                  <div className="terminal-prompt">
                    <span className="prompt-user">hariharan</span>
                    <span className="prompt-separator">@</span>
                    <span className="prompt-host">aigamer.dev</span>
                    <span className="prompt-separator">:</span>
                    <span className="prompt-path">{entry.directory}</span>
                    <span className="prompt-symbol">$</span>
                    <span className="command-text">{entry.command}</span>
                  </div>
                ) : (
                  <pre className="command-output">{entry.output}</pre>
                )}
              </div>
            ))}

            {/* Current input line */}
            <div className="terminal-input-line">
              <span className="prompt-user">hariharan</span>
              <span className="prompt-separator">@</span>
              <span className="prompt-host">aigamer.dev</span>
              <span className="prompt-separator">:</span>
              <span className="prompt-path">{currentDirectory}</span>
              <span className="prompt-symbol">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="terminal-input"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {/* Auto-completion suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                className="suggestions-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* AI Orb */}
        {showOrb && !isFullscreen && (
          <motion.div
            className="ai-orb"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <motion.div
          className="fullscreen-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleFullscreen}
        />
      )}
    </>
  );
};

export default TerminalCode;
