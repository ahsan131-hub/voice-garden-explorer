
import React from 'react';
import { Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Voice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}

interface VoiceCardProps {
  voice: Voice;
  onPlay: () => void;
  demoText: string;
}

const VoiceCard = ({ voice, onPlay, demoText }: VoiceCardProps) => {
  const getLanguageFlag = (lang: string) => {
    const country = lang.split('-')[1] || lang.split('-')[0];
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

  const getGenderIcon = (name: string) => {
    // Simple heuristic to guess gender based on name
    const femaleNames = ['alice', 'anna', 'emma', 'sara', 'maria', 'kate', 'helen', 'victoria', 'karen', 'susan', 'sarah', 'samantha', 'fiona', 'veena', 'zuzana', 'daria', 'montse', 'shelley', 'sandy'];
    const maleNames = ['alex', 'daniel', 'david', 'thomas', 'martin', 'jorge', 'fred', 'aaron', 'majed', 'nicky', 'ralph'];
    
    const lowerName = name.toLowerCase();
    if (femaleNames.some(n => lowerName.includes(n))) return '👩';
    if (maleNames.some(n => lowerName.includes(n))) return '👨';
    return '🤖';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getGenderIcon(voice.name)}</span>
            <span className="truncate">{voice.name}</span>
          </div>
          {voice.default && (
            <Badge variant="secondary" className="text-xs">
              Default
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLanguageFlag(voice.lang)}</span>
            <span className="text-sm font-medium">{voice.lang}</span>
          </div>
          <Badge variant={voice.localService ? "default" : "outline"} className="text-xs">
            {voice.localService ? "Local" : "Remote"}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p className="truncate" title={voice.voiceURI}>
            {voice.voiceURI}
          </p>
        </div>
        
        <Button 
          onClick={onPlay}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          variant="outline"
        >
          <Play className="h-4 w-4 mr-2" />
          Play Demo
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceCard;
