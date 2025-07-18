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
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI family elder. How can I help you today?', sender: 'ai', timestamp: new Date() },
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

  const quickQuestions = [
    'How much should my baby sleep?',
    'When is the next vaccination?',
    'What foods are safe?',
    'बच्चा कितना दूध पिए?',
    'टीकाकरण कब है?',
    'क्या खिलाना सुरक्षित है?'
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
              <h1 className="text-xl font-bold text-gray-800">chAIid</h1>
              <p className="text-sm text-gray-600">AI Family Elder</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative p-2 rounded-full bg-white shadow-md">
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
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
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                : 'bg-gradient-to-r from-green-500 to-blue-500 hover:scale-105'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
        </div>

        {/* Video Upload Section */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isRecording 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105'
              }`}
            >
              {isRecording ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </button>
            
            <label className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center cursor-pointer">
              <Upload className="w-6 h-6 text-white" />
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
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Voice Status */}
        {isListening && (
          <div className="text-center mb-6">
            <p className="text-pink-600 font-medium">🎙️ सुन रहा हूँ... (Listening...)</p>
            <p className="text-sm text-gray-600 mt-1">अपना सवाल पूछें (Ask your question)</p>
          </div>
        )}

        {/* Video Status */}
        {isRecording && (
          <div className="text-center mb-6">
            <p className="text-red-600 font-medium">📹 रिकॉर्ड कर रहा हूँ... (Recording...)</p>
            <p className="text-sm text-gray-600 mt-1">अपने बच्चे का वीडियो रिकॉर्ड करें (Record your baby's video)</p>
          </div>
        )}

        {/* Uploaded Videos Preview */}
        {uploadedVideos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Videos</h3>
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
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Baby className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">बेबी राज (Baby Raj)</h3>
              <p className="text-gray-600">{babyAge} old</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Next Vaccination</p>
              <p className="text-green-800 font-semibold">{nextVaccination}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Weight</p>
              <p className="text-blue-800 font-semibold">4.2 kg</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => setCurrentScreen('milestones')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <TrendingUp className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-sm font-medium text-gray-800">Development</p>
            <p className="text-xs text-gray-600">Track milestones</p>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('schemes')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Award className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-sm font-medium text-gray-800">Schemes</p>
            <p className="text-xs text-gray-600">Govt benefits</p>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('community')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Users className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-gray-800">Community</p>
            <p className="text-xs text-gray-600">Connect & share</p>
          </button>
          
          <button 
            onClick={() => setCurrentScreen('myths')}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <AlertCircle className="w-6 h-6 text-red-500 mb-2" />
            <p className="text-sm font-medium text-gray-800">Myth Buster</p>
            <p className="text-xs text-gray-600">Safe practices</p>
          </button>
        </div>

        {/* Daily Tip */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">आज का सुझाव (Today's Tip)</h3>
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
              <h2 className="font-semibold text-gray-800">AI Family Elder</h2>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`p-2 rounded-full ${isListening ? 'bg-red-100' : 'bg-green-100'}`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-red-600" />
            ) : (
              <Mic className="w-5 h-5 text-green-600" />
            )}
          </button>
          <button 
            onClick={() => setIsRecording(!isRecording)}
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
        <p className="text-sm text-gray-600 mb-2">Quick Questions:</p>
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
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Video Analysis</h4>
          <label className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs cursor-pointer hover:bg-purple-200">
            <Upload className="w-3 h-3" />
            <span>Upload Video</span>
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
                }
              }}
            />
          </label>
        </div>
        
        {/* Uploaded Videos List */}
        {uploadedVideos.length > 0 && (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uploadedVideos.slice(-3).map((video) => (
              <div key={video.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <Play className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800 truncate max-w-32">{video.name}</p>
                    <p className="text-xs text-gray-500">
                      {video.uploadTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
                <button className="text-purple-600 text-xs hover:text-purple-700">
                  Analyze
                </button>
              </div>
            ))}
          </div>
        )}
        
        {uploadedVideos.length === 0 && (
          <div className="text-center py-4">
            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Upload videos to get AI analysis</p>
            <p className="text-xs text-gray-400">Development tracking, behavior analysis</p>
          </div>
        )}
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
              placeholder="Type your message... | अपना संदेश लिखें..."
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
                  <h2 className="text-xl font-bold text-gray-800">Community</h2>
                  <p className="text-sm text-gray-600">Connect with other parents</p>
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
                <p className="text-xs text-gray-600">Active Parents</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">150</p>
                <p className="text-xs text-gray-600">Healthcare Experts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">890</p>
                <p className="text-xs text-gray-600">Posts Today</p>
              </div>
            </div>
          </div>

          {/* New Post Button */}
          <div className="mx-4 mt-4">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Share Your Experience</span>
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
                    Read More
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

  const BottomNav = () => (
    <div className="bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-around">
        <button 
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'home' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('chat')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'chat' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs mt-1">Chat</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('community')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'community' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs mt-1">Community</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('profile')}
          className={`flex flex-col items-center p-2 ${currentScreen === 'profile' ? 'text-purple-600' : 'text-gray-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
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
                    <span>Community</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-600" />
                    <span>Education Center</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span>Safety Guide</span>
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
      </div>
      
      <BottomNav />
      <SideMenu />
    </div>
  );
};

export default ChaiidApp;
