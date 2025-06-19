import React, { useState, useEffect } from 'react';
import { Search, Volume2, Play, Pause, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import VoiceCard from './VoiceCard';

interface Voice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

const VoiceExplorer = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [demoText, setDemoText] = useState('Hello! This is a demonstration of this voice. How do you like the way I sound?');
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyPlayingVoice, setCurrentlyPlayingVoice] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log('Available voices:', availableVoices);
      
      if (availableVoices.length > 0) {
        const voiceData = availableVoices.map(voice => ({
          voiceURI: voice.voiceURI,
          name: voice.name,
          lang: voice.lang,
          localService: voice.localService,
          default: voice.default
        }));
        
        setVoices(voiceData);
        setFilteredVoices(voiceData);
        setIsLoading(false);
        
        toast({
          title: "Voices Loaded",
          description: `Found ${voiceData.length} available voices`,
        });
      }
    };

    // Load voices immediately if available
    loadVoices();

    // Also listen for the voiceschanged event (some browsers need this)
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [toast]);

  useEffect(() => {
    let filtered = voices;

    if (searchTerm) {
      filtered = filtered.filter(voice => 
        voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voice.lang.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(voice => voice.lang.startsWith(selectedLanguage));
    }

    setFilteredVoices(filtered);
  }, [voices, searchTerm, selectedLanguage]);

  const uniqueLanguages = [...new Set(voices.map(voice => voice.lang.split('-')[0]))].sort();

  // Group filtered voices by language
  const groupedVoices = filteredVoices.reduce((groups, voice) => {
    const language = voice.lang;
    if (!groups[language]) {
      groups[language] = [];
    }
    groups[language].push(voice);
    return groups;
  }, {} as Record<string, Voice[]>);

  const sortedLanguages = Object.keys(groupedVoices).sort();

  const getLanguageDisplayName = (langCode: string) => {
    const [language, country] = langCode.split('-');
    const languageNames: Record<string, string> = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'th': 'Thai',
      'vi': 'Vietnamese',
      'nl': 'Dutch',
      'sv': 'Swedish',
      'no': 'Norwegian',
      'da': 'Danish',
      'fi': 'Finnish',
      'pl': 'Polish',
      'cs': 'Czech',
      'hu': 'Hungarian',
      'ro': 'Romanian',
      'bg': 'Bulgarian',
      'hr': 'Croatian',
      'sk': 'Slovak',
      'sl': 'Slovenian',
      'et': 'Estonian',
      'lv': 'Latvian',
      'lt': 'Lithuanian',
      'el': 'Greek',
      'tr': 'Turkish',
      'he': 'Hebrew',
      'ca': 'Catalan',
      'eu': 'Basque',
      'gl': 'Galician',
      'cy': 'Welsh',
      'ga': 'Irish',
      'mt': 'Maltese',
      'is': 'Icelandic',
      'fo': 'Faroese',
      'mk': 'Macedonian',
      'sq': 'Albanian',
      'sr': 'Serbian',
      'bs': 'Bosnian',
      'me': 'Montenegrin',
    };
    
    const languageName = languageNames[language.toLowerCase()] || language.toUpperCase();
    return country ? `${languageName} (${country.toUpperCase()})` : languageName;
  };

  const getLanguageFlag = (langCode: string) => {
    const country = langCode.split('-')[1] || langCode.split('-')[0];
    const flagMap: { [key: string]: string } = {
      'US': '🇺🇸', 'GB': '🇬🇧', 'AU': '🇦🇺', 'CA': '🇨🇦',
      'FR': '🇫🇷', 'DE': '🇩🇪', 'ES': '🇪🇸', 'IT': '🇮🇹',
      'JP': '🇯🇵', 'KR': '🇰🇷', 'CN': '🇨🇳', 'RU': '🇷🇺',
      'PT': '🇵🇹', 'NL': '🇳🇱', 'SE': '🇸🇪', 'NO': '🇳🇴',
      'DK': '🇩🇰', 'FI': '🇫🇮', 'PL': '🇵🇱', 'CZ': '🇨🇿',
      'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷',
      'SK': '🇸🇰', 'SI': '🇸🇮', 'EE': '🇪🇪', 'LV': '🇱🇻',
      'LT': '🇱🇹', 'MT': '🇲🇹', 'CY': '🇨🇾', 'IE': '🇮🇪',
      'AR': '🇦🇷', 'MX': '🇲🇽', 'CL': '🇨🇱', 'CO': '🇨🇴',
      'PE': '🇵🇪', 'VE': '🇻🇪', 'UY': '🇺🇾', 'PY': '🇵🇾',
      'BO': '🇧🇴', 'EC': '🇪🇨', 'GT': '🇬🇹', 'HN': '🇭🇳',
      'SV': '🇸🇻', 'NI': '🇳🇮', 'CR': '🇨🇷', 'PA': '🇵🇦',
      'DO': '🇩🇴', 'CU': '🇨🇺', 'PR': '🇵🇷', 'BR': '🇧🇷',
      'IN': '🇮🇳', 'PK': '🇵🇰', 'BD': '🇧🇩', 'LK': '🇱🇰',
      'TH': '🇹🇭', 'VN': '🇻🇳', 'ID': '🇮🇩', 'MY': '🇲🇾',
      'SG': '🇸🇬', 'PH': '🇵🇭', 'TW': '🇹🇼', 'HK': '🇭🇰',
      'TR': '🇹🇷', 'GR': '🇬🇷', 'IL': '🇮🇱', 'SA': '🇸🇦',
      'EG': '🇪🇬', 'MA': '🇲🇦', 'DZ': '🇩🇿', 'TN': '🇹🇳',
      'ZA': '🇿🇦', 'NG': '🇳🇬', 'KE': '🇰🇪', 'GH': '🇬🇭',
      'ET': '🇪🇹', 'TZ': '🇹🇿', 'UG': '🇺🇬', 'ZW': '🇿🇼'
    };
    return flagMap[country.toUpperCase()] || '🌐';
  };

  const handlePlayDemo = (voice: Voice) => {
    // Stop any current speech
    window.speechSynthesis.cancel();
    setCurrentlyPlayingVoice(null);
    
    const utterance = new SpeechSynthesisUtterance(demoText);
    const synthVoice = window.speechSynthesis.getVoices().find(v => v.voiceURI === voice.voiceURI);
    
    if (synthVoice) {
      utterance.voice = synthVoice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        console.log(`Started speaking with voice: ${voice.name}`);
        setCurrentlyPlayingVoice(voice.voiceURI);
      };
      
      utterance.onend = () => {
        console.log(`Finished speaking with voice: ${voice.name}`);
        setCurrentlyPlayingVoice(null);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setCurrentlyPlayingVoice(null);
        toast({
          title: "Playback Error",
          description: "Failed to play voice demo",
          variant: "destructive",
        });
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAllSpeech = () => {
    window.speechSynthesis.cancel();
    setCurrentlyPlayingVoice(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading available voices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Speech Synthesis Voice Explorer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover and test all available speech synthesis voices in your browser. Search, filter, and play demos to find the perfect voice.
        </p>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Demo Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Demo Text</label>
            <Textarea
              value={demoText}
              onChange={(e) => setDemoText(e.target.value)}
              placeholder="Enter text to be spoken by the voices..."
              className="min-h-[100px] resize-none"
            />
          </div>
          <Button 
            onClick={stopAllSpeech}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Pause className="h-4 w-4 mr-2" />
            Stop All Speech
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by voice name or language..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Languages</option>
                {uniqueLanguages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredVoices.length} of {voices.length} voices
            </span>
            <Badge variant="outline">
              {voices.filter(v => v.localService).length} Local Voices
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Language Sections */}
      <div className="space-y-8">
        {sortedLanguages.map((language) => (
          <div key={language} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-border pb-2">
              <span className="text-2xl">{getLanguageFlag(language)}</span>
              <h2 className="text-2xl font-semibold text-foreground">
                {getLanguageDisplayName(language)}
              </h2>
              <Badge variant="outline" className="ml-auto">
                {groupedVoices[language].length} {groupedVoices[language].length === 1 ? 'voice' : 'voices'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedVoices[language].map((voice) => (
                <VoiceCard
                  key={voice.voiceURI}
                  voice={voice}
                  onPlay={() => handlePlayDemo(voice)}
                  demoText={demoText}
                  isPlaying={currentlyPlayingVoice === voice.voiceURI}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredVoices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No voices found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceExplorer;
