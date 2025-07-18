import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Baby, Calendar, MapPin, BookOpen, Users, Phone, Bell, Menu, X, Heart, Shield, Zap, Home, User, Settings, MessageCircle, Award, TrendingUp, Clock, AlertCircle, CheckCircle, Star, Volume2, Video, VideoOff, Upload, Play, Pause } from 'lucide-react';

const ChaiidApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [babyAge, setBabyAge] = useState('2 months 15 days');
  const [nextVaccination, setNextVaccination] = useState('DPT - 3 days');
  const [showMenu, setShowMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState([
    {
      id: 1,
      title: 'Vaccination Reminder',
      message: 'DPT vaccination is due in 3 days. Book your appointment now.',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'vaccination',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Development Milestone',
      message: 'Your baby might start smiling soon! Track this milestone.',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000),
      type: 'milestone',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Feeding Time',
      message: 'Time for next feeding session. Remember to burp after feeding.',
      time: new Date(Date.now() - 1 * 60 * 60 * 1000),
      type: 'feeding',
      read: true,
      priority: 'normal'
    },
    {
      id: 4,
      title: 'Sleep Schedule',
      message: 'Baby should be getting ready for sleep. Create a calm environment.',
      time: new Date(Date.now() - 30 * 60 * 1000),
      type: 'sleep',
      read: false,
      priority: 'normal'
    },
    {
      id: 5,
      title: 'Community Update',
      message: 'Dr. Sharma posted new tips about baby nutrition.',
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: 'community',
      read: false,
      priority: 'low'
    }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! I\'m your chAlid. How can I help you today?', sender: 'ai', timestamp: new Date() },
    { id: 2, text: 'मैं आपकी सहायता करने के लिए यहाँ हूँ।', sender: 'ai', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: 1,
      author: 'Dr. Priya Sharma',
      title: 'Essential Tips for 2-Month Baby Care',
      content: 'Here are some important guidelines for caring for your 2-month-old baby...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 45,
      comments: 12,
      type: 'expert',
      tags: ['newborn', 'care', 'tips']
    },
    {
      id: 2,
      author: 'Meera Patel',
      title: 'My baby started smiling today! 😊',
      content: 'I\'m so excited! My 8-week-old baby smiled at me for the first time today. Any other moms experiencing this milestone?',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 23,
      comments: 8,
      type: 'parent',
      tags: ['milestone', 'smile', 'development']
    },
    {
      id: 3,
      author: 'Nurse Anjali',
      title: 'Vaccination Schedule Reminder',
      content: 'Don\'t forget your baby\'s 2-month vaccinations! DPT, Polio, and Hepatitis B are crucial for your baby\'s health.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 67,
      comments: 15,
      type: 'healthcare',
      tags: ['vaccination', 'health', 'schedule']
    }
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Tamil', 'Gujarati', 'Marathi', 'Kannada'];

  // Language translations
  const translations = {
    English: {
      appName: 'Babycare',
      appSubtitle: 'chAlid',
      home: 'Home',
      chat: 'Chat',
      community: 'Community',
      profile: 'Profile',
      development: 'Development',
      trackMilestones: 'Track milestones',
      schemes: 'Schemes',
      govtBenefits: 'Govt benefits',
      connectShare: 'Connect & share',
      mythBuster: 'Myth Buster',
      safePractices: 'Safe practices',
      localCare: 'Local Care',
      nearbyServices: 'Nearby services',
      askAI: 'Ask AI',
      getInstantHelp: 'Get instant help',
      todaysTip: 'Today\'s Tip',
      tapForNewTip: 'Tap for new tip',
      listening: 'Listening...',
      askYourQuestion: 'Ask your question',
      recording: 'Recording...',
      recordBabyVideo: 'Record your baby\'s video',
      recentVideos: 'Recent Videos',
      nextVaccination: 'Next Vaccination',
      weight: 'Weight',
      developmentProgress: 'Development progress',
      questionsAsked: 'Questions Asked',
      videosShared: 'Videos Shared',
      milestones: 'Milestones',
      babyName: 'Baby Raj',
      connectWithParents: 'Connect with other parents',
      shareExperience: 'Share Your Experience',
      activeParents: 'Active Parents',
      healthcareExperts: 'Healthcare Experts',
      postsToday: 'Posts Today',
      readMore: 'Read More',
      online: 'Online',
      quickQuestions: 'Quick Questions:',
      typeMessage: 'Type your message...',
      uploadVideo: 'Upload Video',
      uploadVideos: 'Upload videos to get AI analysis',
      developmentTracking: 'Development tracking, behavior analysis',
      educationCenter: 'Education Center',
      safetyGuide: 'Safety Guide',
      notifications: 'Notifications',
      markAllRead: 'Mark All Read',
      clearAll: 'Clear All',
      noNotifications: 'No new notifications',
      vaccinationReminder: 'Vaccination Reminder',
      developmentMilestone: 'Development Milestone',
      feedingTime: 'Feeding Time',
      sleepSchedule: 'Sleep Schedule',
      communityUpdate: 'Community Update',
      justNow: 'Just now',
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago'
    },
    Hindi: {
      appName: 'बेबीकेयर',
      appSubtitle: 'चैलिड',
      home: 'होम',
      chat: 'चैट',
      community: 'समुदाय',
      profile: 'प्रोफ़ाइल',
      development: 'विकास',
      trackMilestones: 'मील के पत्थर ट्रैक करें',
      schemes: 'योजनाएं',
      govtBenefits: 'सरकारी लाभ',
      connectShare: 'जुड़ें और साझा करें',
      mythBuster: 'मिथक तोड़क',
      safePractices: 'सुरक्षित प्रथाएं',
      localCare: 'स्थानीय देखभाल',
      nearbyServices: 'आस-पास की सेवाएं',
      askAI: 'AI से पूछें',
      getInstantHelp: 'तुरंत सहायता पाएं',
      todaysTip: 'आज का सुझाव',
      tapForNewTip: 'नए सुझाव के लिए टैप करें',
      listening: 'सुन रहा हूँ...',
      askYourQuestion: 'अपना सवाल पूछें',
      recording: 'रिकॉर्ड कर रहा हूँ...',
      recordBabyVideo: 'अपने बच्चे का वीडियो रिकॉर्ड करें',
      recentVideos: 'हाल के वीडियो',
      nextVaccination: 'अगला टीकाकरण',
      weight: 'वजन',
      developmentProgress: 'विकास प्रगति',
      questionsAsked: 'पूछे गए सवाल',
      videosShared: 'साझा किए गए वीडियो',
      milestones: 'मील के पत्थर',
      babyName: 'बेबी राज',
      connectWithParents: 'अन्य माता-पिता से जुड़ें',
      shareExperience: 'अपना अनुभव साझा करें',
      activeParents: 'सक्रिय माता-पिता',
      healthcareExperts: 'स्वास्थ्य विशेषज्ञ',
      postsToday: 'आज की पोस्ट',
      readMore: 'और पढ़ें',
      online: 'ऑनलाइन',
      quickQuestions: 'त्वरित प्रश्न:',
      typeMessage: 'अपना संदेश लिखें...',
      uploadVideo: 'वीडियो अपलोड करें',
      uploadVideos: 'AI विश्लेषण के लिए वीडियो अपलोड करें',
      developmentTracking: 'विकास ट्रैकिंग, व्यवहार विश्लेषण',
      educationCenter: 'शिक्षा केंद्र',
      safetyGuide: 'सुरक्षा गाइड',
      notifications: 'सूचनाएं',
      markAllRead: 'सभी को पढ़ा हुआ मार्क करें',
      clearAll: 'सभी को हटाएं',
      noNotifications: 'कोई नई सूचना नहीं',
      vaccinationReminder: 'टीकाकरण अनुस्मारक',
      developmentMilestone: 'विकास मील का पत्थर',
      feedingTime: 'दूध पिलाने का समय',
      sleepSchedule: 'नींद का समय',
      communityUpdate: 'समुदाय अपडेट',
      justNow: 'अभी',
      minutesAgo: 'मिनट पहले',
      hoursAgo: 'घंटे पहले',
      daysAgo: 'दिन पहले'
    }
  };

  // Get current language translations
  const t = translations[currentLanguage] || translations.English;

  // Notification helper functions
  const getUnreadNotifications = () => notificationList.filter(n => !n.read);
  
  const markNotificationAsRead = (notificationId) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setNotifications(prev => Math.max(0, prev - 1));
  };

  const markAllNotificationsAsRead = () => {
    setNotificationList(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setNotifications(0);
  };

  const clearAllNotifications = () => {
    setNotificationList([]);
    setNotifications(0);
    setShowNotifications(false);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return t.justNow;
    if (diffMins < 60) return `${diffMins} ${t.minutesAgo}`;
    if (diffHours < 24) return `${diffHours} ${t.hoursAgo}`;
    return `${diffDays} ${t.daysAgo}`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'vaccination': return '💉';
      case 'milestone': return '🎯';
      case 'feeding': return '🍼';
      case 'sleep': return '😴';
      case 'community': return '👥';
      default: return '📢';
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const addNewNotification = (title, message, type = 'general', priority = 'normal') => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      time: new Date(),
      type,
      read: false,
      priority
    };
    setNotificationList(prev => [newNotification, ...prev]);
    setNotifications(prev => prev + 1);
  };

  // Update notification count when notification list changes
  useEffect(() => {
    const unreadCount = notificationList.filter(n => !n.read).length;
    setNotifications(unreadCount);
  }, [notificationList]);

  // Voice interface functions
  const handleVoiceToggle = () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      // Add notification when voice session ends
      addNewNotification(
        'Voice Session Ended',
        'Voice listening has been turned off.',
        'general',
        'low'
      );
    } else {
      // Start listening
      setIsListening(true);
      // Add notification when voice session starts
      addNewNotification(
        'Voice Session Started',
        'Listening for your voice commands. Speak now!',
        'general',
        'medium'
      );
      
      // Simulate voice recognition timeout after 30 seconds
      setTimeout(() => {
        if (isListening) {
          setIsListening(false);
          addNewNotification(
            'Voice Session Timeout',
            'Voice listening stopped due to inactivity.',
            'general',
            'low'
          );
        }
      }, 30000);
    }
  };

  // Video recording functions
  const handleVideoToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Add notification when recording ends
      addNewNotification(
        'Video Recording Stopped',
        'Video recording has been stopped successfully.',
        'milestone',
        'medium'
      );
    } else {
      // Start recording
      setIsRecording(true);
      // Add notification when recording starts
      addNewNotification(
        'Video Recording Started',
        'Recording your baby\'s video. Tap again to stop.',
        'milestone',
        'medium'
      );
      
      // Simulate auto-stop after 2 minutes
      setTimeout(() => {
        if (isRecording) {
          setIsRecording(false);
          addNewNotification(
            'Video Recording Auto-Stopped',
            'Recording stopped automatically after 2 minutes.',
            'milestone',
            'low'
          );
        }
      }, 120000);
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Generate contextual notifications based on AI response
      if (inputMessage.toLowerCase().includes('vaccine') || inputMessage.toLowerCase().includes('vaccination')) {
        addNewNotification(
          t.vaccinationReminder,
          'Don\'t forget to book your DPT vaccination appointment for next week.',
          'vaccination',
          'high'
        );
      } else if (inputMessage.toLowerCase().includes('sleep') || inputMessage.toLowerCase().includes('नींद')) {
        addNewNotification(
          t.sleepSchedule,
          'Create a bedtime routine to help your baby sleep better.',
          'sleep',
          'medium'
        );
      } else if (inputMessage.toLowerCase().includes('feeding') || inputMessage.toLowerCase().includes('milk')) {
        addNewNotification(
          t.feedingTime,
          'Remember to burp your baby after feeding to prevent gas.',
          'feeding',
          'normal'
        );
      }
    }, 1500);
  };

  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('vaccine') || lowerMessage.includes('vaccination')) {
      return 'Next vaccination for your baby is DPT in 3 days. Would you like me to remind you? | अगला टीकाकरण DPT 3 दिन में है। क्या आप चाहते हैं कि मैं आपको याद दिलाऊं?';
    } else if (lowerMessage.includes('feeding') || lowerMessage.includes('milk')) {
      return 'For a 2-month baby, feed every 2-3 hours. Breast milk is best. | 2 महीने के बच्चे को हर 2-3 घंटे में दूध पिलाएं। माँ का दूध सबसे अच्छा है।';
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('नींद')) {
      return 'Babies need 14-16 hours of sleep daily. Create a calm environment. | बच्चों को दिन में 14-16 घंटे की नींद चाहिए। शांत माहौल बनाएं।';
    } else if (lowerMessage.includes('crying') || lowerMessage.includes('रो')) {
      return 'Babies cry for hunger, diaper change, or discomfort. Check these first. | बच्चे भूख, डायपर या असहजता के कारण रोते हैं। पहले इन्हें चेक करें।';
    } else {
      return 'I understand your concern. Can you tell me more about your baby\'s specific needs? | मैं आपकी चिंता समझता हूँ। क्या आप अपने बच्चे की विशिष्ट आवश्यकताओं के बारे में और बता सकते हैं?';
    }
  };

  const quickQuestions = currentLanguage === 'Hindi' ? [
    'मेरे बच्चे को कितनी नींद चाहिए?',
    'अगला टीकाकरण कब है?',
    'कौन से खाद्य पदार्थ सुरक्षित हैं?',
    'बच्चा कितना दूध पिए?',
    'टीकाकरण कब है?',
    'क्या खिलाना सुरक्षित है?'
  ] : [
    'How much should my baby sleep?',
    'When is the next vaccination?',
    'What foods are safe?',
    'How much milk should baby drink?',
    'When is vaccination due?',
    'What is safe to feed?'
  ];

  const milestones = [
    { age: '2 months', milestone: 'Smiles at people', completed: true },
    { age: '2 months', milestone: 'Holds head up', completed: true },
    { age: '3 months', milestone: 'Follows objects with eyes', completed: false },
    { age: '3 months', milestone: 'Begins to babble', completed: false },
  ];

  const governmentSchemes = [
    { name: 'Janani Suraksha Yojana', description: 'Cash assistance for safe delivery', eligible: true },
    { name: 'Pradhan Mantri Matru Vandana Yojana', description: 'Maternity benefit scheme', eligible: true },
    { name: 'Integrated Child Development Services', description: 'Nutrition & healthcare', eligible: true },
  ];

  const myths = [
    { myth: 'Applying kajal makes eyes beautiful', fact: 'Can cause lead poisoning and infections', danger: 'high' },
    { myth: 'Honey is good for newborns', fact: 'Can cause botulism in babies under 12 months', danger: 'high' },
    { myth: 'Janam Ghutti helps with digestion', fact: 'Can contain harmful ingredients', danger: 'medium' },
  ];

  const HomeScreen = () => (
    <div className="h-full bg-gradient-to-br from-pink-50 to-purple-50 overflow-y-auto">
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{t.appName}</h1>
              <p className="text-sm text-gray-600">{t.appSubtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-full bg-white shadow-md">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Voice Assistant Button */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <button
              onClick={handleVoiceToggle}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse scale-110' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
            {/* Voice Animation Rings */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" style={{animationDelay: '0.5s'}}></div>
              </>
            )}
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={handleVideoToggle}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isRecording 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse scale-110' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105'
                }`}
              >
                {isRecording ? (
                  <VideoOff className="w-6 h-6 text-white" />
                ) : (
                  <Video className="w-6 h-6 text-white" />
                )}
              </button>
              {/* Recording Animation */}
              {isRecording && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
              )}
            </div>
            
            <label className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center cursor-pointer relative group">
              <Upload className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {t.uploadVideo}
              </div>
              <input 
                type="file" 
                accept="video/*" 
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const newVideo = {
                      id: Date.now(),
                      name: e.target.files[0].name,
                      file: e.target.files[0],
                      uploadTime: new Date()
                    };
                    setUploadedVideos([...uploadedVideos, newVideo]);
                    
                    // Add notification for video upload
                    addNewNotification(
                      'Video Analysis Ready',
                      `AI analysis for "${e.target.files[0].name}" will be ready in 2-3 minutes.`,
                      'milestone',
                      'medium'
                    );
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Voice Status */}
        {isListening && (
          <div className="text-center mb-6">
            <p className="text-pink-600 font-medium">🎙️ {t.listening}</p>
            <p className="text-sm text-gray-600 mt-1">{t.askYourQuestion}</p>
          </div>
        )}

        {/* Video Status */}
        {isRecording && (
          <div className="text-center mb-6">
            <p className="text-red-600 font-medium">📹 {t.recording}</p>
            <p className="text-sm text-gray-600 mt-1">{t.recordBabyVideo}</p>
          </div>
        )}

        {/* Uploaded Videos Preview */}
        {uploadedVideos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.recentVideos}</h3>
            <div className="flex space-x-3 overflow-x-auto">
              {uploadedVideos.slice(-3).map((video) => (
                <div key={video.id} className="bg-white rounded-lg p-3 shadow-md min-w-[120px]">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                    <Play className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-xs text-gray-600 truncate">{video.name}</p>
                  <p className="text-xs text-gray-500">
                    {video.uploadTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Baby Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{t.babyName}</h3>
              <p className="text-gray-600">{babyAge} old</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4 animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{t.developmentProgress}: 75%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">{t.nextVaccination}</p>
                  <p className="text-green-800 font-semibold">{nextVaccination}</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">{t.weight}</p>
                  <p className="text-blue-800 font-semibold">4.2 kg</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-center">
              <div className="flex-1">
                <p className="text-lg font-bold text-purple-600">{chatMessages.length - 2}</p>
                <p className="text-xs text-gray-600">{t.questionsAsked}</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-orange-600">{uploadedVideos.length}</p>
                <p className="text-xs text-gray-600">{t.videosShared}</p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-green-600">5</p>
                <p className="text-xs text-gray-600">{t.milestones}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => setCurrentScreen('milestones')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <TrendingUp className="w-6 h-6 text-purple-500 mb-2 mx-auto" />
            <p className="text-sm font-medium text-gray-800">{t.development}</p>
            <p className="text-xs text-gray-600">{t.trackMilestones}</p>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('schemes')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Award className="w-6 h-6 text-green-500 mb-2 mx-auto" />
            <p className="text-sm font-medium text-gray-800">{t.schemes}</p>
            <p className="text-xs text-gray-600">{t.govtBenefits}</p>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('community')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Users className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
            <p className="text-sm font-medium text-gray-800">{t.community}</p>
            <p className="text-xs text-gray-600">{t.connectShare}</p>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('myths')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <AlertCircle className="w-6 h-6 text-red-500 mb-2 mx-auto" />
            <p className="text-sm font-medium text-gray-800">{t.mythBuster}</p>
            <p className="text-xs text-gray-600">{t.safePractices}</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('local')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MapPin className="w-6 h-6 text-orange-500 mb-2 mx-auto" />
            <p className="text-sm font-medium text-gray-800">{t.localCare}</p>
            <p className="text-xs text-gray-600">{t.nearbyServices}</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('chat')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-6 h-6 text-pink-500 mb-2 mx-auto" />
            <p className="text-sm font-medium text-gray-800">{t.askAI}</p>
            <p className="text-xs text-gray-600">{t.getInstantHelp}</p>
          </button>
        </div>

        {/* Daily Tip */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95"
             onClick={() => {
               const tips = [
                 { hindi: '2 महीने के बच्चे को दिन में 14-16 घंटे की नींद की जरूरत होती है। रात को 6-8 घंटे लगातार सोना सामान्य है।', english: 'Babies at 2 months need 14-16 hours of sleep daily.' },
                 { hindi: 'स्तनपान बच्चे के लिए सबसे अच्छा भोजन है। यह रोग प्रतिरोधक क्षमता बढ़ाता है।', english: 'Breastfeeding is the best nutrition and boosts immunity.' },
                 { hindi: 'बच्चे के साथ बात करना उसके दिमाग के विकास के लिए जरूरी है।', english: 'Talking to your baby is essential for brain development.' },
                 { hindi: 'टीकाकरण समय पर कराना बच्चे को बीमारियों से बचाता है।', english: 'Timely vaccination protects your baby from diseases.' }
               ];
               const randomTip = tips[Math.floor(Math.random() * tips.length)];
               // This would normally update state, but for demo we'll just show animation
             }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{t.todaysTip}</h3>
            </div>
            <div className="text-white/80 text-xs bg-white/20 px-2 py-1 rounded-full">
              {t.tapForNewTip}
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            2 महीने के बच्चे को दिन में 14-16 घंटे की नींद की जरूरत होती है। रात को 6-8 घंटे लगातार सोना सामान्य है।
          </p>
          <p className="text-xs mt-2 opacity-90">
            Babies at 2 months need 14-16 hours of sleep daily.
          </p>
        </div>
      </div>
    </div>
  );

  const NotificationPanel = () => (
    showNotifications && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="absolute right-4 top-16 w-80 max-h-96 bg-white rounded-lg shadow-xl border overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t.notifications}</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm opacity-90">
                {getUnreadNotifications().length} unread
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={markAllNotificationsAsRead}
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                >
                  {t.markAllRead}
                </button>
                <button 
                  onClick={clearAllNotifications}
                  className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors"
                >
                  {t.clearAll}
                </button>
              </div>
            </div>
          </div>

          {/* Notification List */}
          <div className="max-h-80 overflow-y-auto">
            {notificationList.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">{t.noNotifications}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notificationList.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                      !notification.read 
                        ? getNotificationColor(notification.priority)
                        : 'border-gray-200 bg-white'
                    } ${!notification.read ? 'font-medium' : 'opacity-75'}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium text-gray-800 ${
                            !notification.read ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${
                          !notification.read ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {getTimeAgo(notification.time)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notificationList.length > 0 && (
            <div className="bg-gray-50 p-3 border-t">
              <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium">
                View All Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );

  const MilestonesScreen = () => (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Development Milestones</h2>
          <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-white shadow-md">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{milestone.milestone}</p>
                    <p className="text-sm text-gray-600">{milestone.age}</p>
                  </div>
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SchemesScreen = () => (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Government Schemes</h2>
          <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-white shadow-md">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          {governmentSchemes.map((scheme, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{scheme.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      scheme.eligible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {scheme.eligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MythsScreen = () => (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Myth Buster</h2>
          <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-white shadow-md">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          {myths.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.danger === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <AlertCircle className={`w-5 h-5 ${
                    item.danger === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <p className="text-sm font-medium text-red-700 mb-1">❌ Myth:</p>
                    <p className="text-sm text-gray-800">{item.myth}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">✅ Fact:</p>
                    <p className="text-sm text-gray-800">{item.fact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const LocalCareScreen = () => (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Local Care Services</h2>
          <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-white shadow-md">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Vaccination Centers</h3>
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Primary Health Centre</span>
                <span className="text-sm text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Apollo Clinic</span>
                <span className="text-sm text-blue-600">₹200</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Emergency Services</h3>
              <Phone className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Ambulance</span>
                <span className="text-sm text-red-600">102/108</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Child Helpline</span>
                <span className="text-sm text-red-600">1098</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChatScreen = () => (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{t.appSubtitle}</h2>
              <p className="text-xs text-green-600">{t.online}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleVoiceToggle}
            className={`p-2 rounded-full ${isListening ? 'bg-red-100' : 'bg-green-100'}`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-red-600" />
            ) : (
              <Mic className="w-5 h-5 text-green-600" />
            )}
          </button>
          <button 
            onClick={handleVideoToggle}
            className={`p-2 rounded-full ${isRecording ? 'bg-red-100' : 'bg-purple-100'}`}
          >
            {isRecording ? (
              <VideoOff className="w-5 h-5 text-red-600" />
            ) : (
              <Video className="w-5 h-5 text-purple-600" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="bg-white p-4 border-b border-gray-200 flex-shrink-0">
        <p className="text-sm text-gray-600 mb-2">{t.quickQuestions}</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.slice(0, 3).map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs hover:bg-purple-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-800 shadow-sm'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 shadow-sm px-4 py-2 rounded-2xl">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Status */}
      {isListening && (
        <div className="bg-red-50 border-t border-red-200 p-3 flex-shrink-0">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-red-600 text-sm font-medium">Listening... Speak now</p>
          </div>
        </div>
      )}

      {/* Video Recording Status */}
      {isRecording && (
        <div className="bg-purple-50 border-t border-purple-200 p-3 flex-shrink-0">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <p className="text-purple-600 text-sm font-medium">Recording... Tap to stop</p>
          </div>
        </div>
      )}

      {/* Video Upload Section */}
      <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
        <div className="flex justify-center">
          <label className="w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center cursor-pointer transition-colors">
            <Upload className="w-5 h-5 text-purple-600" />
            <input 
              type="file" 
              accept="video/*" 
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const newVideo = {
                    id: Date.now(),
                    name: e.target.files[0].name,
                    file: e.target.files[0],
                    uploadTime: new Date()
                  };
                  setUploadedVideos([...uploadedVideos, newVideo]);
                  
                  // Add notification for video upload
                  addNewNotification(
                    'Video Uploaded Successfully',
                    `"${e.target.files[0].name}" uploaded. AI analysis in progress...`,
                    'milestone',
                    'medium'
                  );
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={t.typeMessage}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={inputMessage.trim() === ''}
            className={`p-2 rounded-full ${
              inputMessage.trim() === ''
                ? 'bg-gray-200 text-gray-400'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
        
        {/* More Quick Questions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {quickQuestions.slice(3).map((question, index) => (
            <button
              key={index + 3}
              onClick={() => setInputMessage(question)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const CommunityScreen = () => {
    const categories = ['all', 'expert', 'parent', 'healthcare'];
    
    const filteredPosts = selectedCategory === 'all' 
      ? communityPosts 
      : communityPosts.filter(post => post.type === selectedCategory);

    const handleLikePost = (postId) => {
      setCommunityPosts(posts => 
        posts.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      );
      
      // Add notification for community interaction
      addNewNotification(
        t.communityUpdate,
        'Thank you for engaging with the community! Check out more posts.',
        'community',
        'low'
      );
    };

    return (
      <div className="h-full bg-gray-50 overflow-y-auto">
        <div className="pb-20">
          {/* Header */}
          <div className="bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{t.community}</h2>
                  <p className="text-sm text-gray-600">{t.connectWithParents}</p>
                </div>
              </div>
              <button className="p-2 rounded-full bg-purple-100 hover:bg-purple-200">
                <Users className="w-5 h-5 text-purple-600" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white mx-4 mt-4 rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">2.5K</p>
                <p className="text-xs text-gray-600">{t.activeParents}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">150</p>
                <p className="text-xs text-gray-600">{t.healthcareExperts}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">890</p>
                <p className="text-xs text-gray-600">{t.postsToday}</p>
              </div>
            </div>
          </div>

          {/* New Post Button */}
          <div className="mx-4 mt-4">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{t.shareExperience}</span>
              </div>
            </button>
          </div>

          {/* Community Posts */}
          <div className="mx-4 mt-4 space-y-4">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg p-4 shadow-sm">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      post.type === 'expert' ? 'bg-blue-100' :
                      post.type === 'healthcare' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {post.type === 'expert' ? (
                        <BookOpen className={`w-5 h-5 ${
                          post.type === 'expert' ? 'text-blue-600' :
                          post.type === 'healthcare' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      ) : post.type === 'healthcare' ? (
                        <Shield className="w-5 h-5 text-green-600" />
                      ) : (
                        <User className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">
                        {post.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.type === 'expert' ? 'bg-blue-100 text-blue-800' :
                    post.type === 'healthcare' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {post.type}
                  </span>
                </div>

                {/* Post Content */}
                <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{post.content}</p>

                {/* Post Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                    {t.readMore}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Expert Section */}
          <div className="mx-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Ask Dr. Sharma</h3>
                <p className="text-xs opacity-90">Pediatrician • 15 years exp</p>
              </div>
            </div>
            <p className="text-sm mb-3 opacity-90">
              Get expert advice on baby care, vaccination schedules, and development milestones.
            </p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium">
              Ask Question
            </button>
          </div>

          {/* Quick Discussion Topics */}
          <div className="mx-4 mt-4 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Trending Topics</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="text-sm font-medium">💤 Sleep Training Tips</span>
                <p className="text-xs text-gray-600">234 discussions</p>
              </button>
              <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="text-sm font-medium">🍼 Breastfeeding Support</span>
                <p className="text-xs text-gray-600">189 discussions</p>
              </button>
              <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="text-sm font-medium">🎯 Development Milestones</span>
                <p className="text-xs text-gray-600">156 discussions</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileScreen = () => (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          <button onClick={() => setCurrentScreen('home')} className="p-2 rounded-full bg-white shadow-md">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Priya Sharma</h3>
              <p className="text-gray-600">New Mother</p>
              <p className="text-sm text-gray-500">Member since January 2025</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Baby's Age</p>
              <p className="text-purple-800 font-semibold">{babyAge}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Location</p>
              <p className="text-blue-800 font-semibold">Mumbai, India</p>
            </div>
          </div>
        </div>

        {/* Baby Details */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Baby Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Name</span>
              <span className="font-medium text-gray-800">बेबी राज (Baby Raj)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date of Birth</span>
              <span className="font-medium text-gray-800">May 3, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Gender</span>
              <span className="font-medium text-gray-800">Male</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium text-gray-800">4.2 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Height</span>
              <span className="font-medium text-gray-800">56 cm</span>
            </div>
          </div>
        </div>

        {/* App Statistics */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">87</p>
              <p className="text-xs text-gray-600">Chat Messages</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-xs text-gray-600">Community Posts</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">{uploadedVideos.length}</p>
              <p className="text-xs text-gray-600">Videos Uploaded</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">5</p>
              <p className="text-xs text-gray-600">Milestones Reached</p>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Notifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{notifications} unread</span>
                <span className="text-gray-400">›</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Language</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{currentLanguage}</span>
                <span className="text-gray-400">›</span>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Privacy & Security</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Help & Support</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">Emergency Contacts</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm opacity-90">Pediatrician</span>
              <span className="text-sm font-medium">+91 98765 43210</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-90">Hospital</span>
              <span className="text-sm font-medium">+91 22 2345 6789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm opacity-90">Emergency</span>
              <span className="text-sm font-medium">102 / 108</span>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-gray-500 text-sm">
          <p>Babycare - chAlid</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-around">
        <button 
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'home' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">{t.home}</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('chat')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'chat' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs mt-1">{t.chat}</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('community')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'community' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs mt-1">{t.community}</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('profile')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'profile' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">{t.profile}</span>
        </button>
      </div>
    </div>
  );

  const SideMenu = () => (
    showMenu && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
              <button onClick={() => setShowMenu(false)} className="p-2 rounded-full bg-gray-100">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Language</p>
                <select 
                  value={currentLanguage} 
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setCurrentScreen('community')}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span>{t.community}</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                    <span>{t.educationCenter}</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span>{t.safetyGuide}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col relative">
      <div className="flex-1 overflow-hidden">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'milestones' && <MilestonesScreen />}
        {currentScreen === 'schemes' && <SchemesScreen />}
        {currentScreen === 'myths' && <MythsScreen />}
        {currentScreen === 'local' && <LocalCareScreen />}
        {currentScreen === 'chat' && <ChatScreen />}
        {currentScreen === 'community' && <CommunityScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </div>
      
      <BottomNav />
      <SideMenu />
      <NotificationPanel />
    </div>
  );
};

export default ChaiidApp;
