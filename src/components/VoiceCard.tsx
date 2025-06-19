import React, { useState } from "react";
import { Play, Square, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  isPlaying?: boolean;
}

const VoiceCard = ({
  voice,
  onPlay,
  demoText,
  isPlaying = false,
}: VoiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLanguageFlag = (lang: string) => {
    const country = lang.split("-")[1] || lang.split("-")[0];
    const flagMap: { [key: string]: string } = {
      US: "🇺🇸",
      GB: "🇬🇧",
      AU: "🇦🇺",
      CA: "🇨🇦",
      FR: "🇫🇷",
      DE: "🇩🇪",
      ES: "🇪🇸",
      IT: "🇮🇹",
      JP: "🇯🇵",
      KR: "🇰🇷",
      CN: "🇨🇳",
      RU: "🇷🇺",
      PT: "🇵🇹",
      NL: "🇳🇱",
      SE: "🇸🇪",
      NO: "🇳🇴",
      DK: "🇩🇰",
      FI: "🇫🇮",
      PL: "🇵🇱",
      CZ: "🇨🇿",
      HU: "🇭🇺",
      RO: "🇷🇴",
      BG: "🇧🇬",
      HR: "🇭🇷",
      SK: "🇸🇰",
      SI: "🇸🇮",
      EE: "🇪🇪",
      LV: "🇱🇻",
      LT: "🇱🇹",
      MT: "🇲🇹",
      CY: "🇨🇾",
      IE: "🇮🇪",
      AR: "🇦🇷",
      MX: "🇲🇽",
      CL: "🇨🇱",
      CO: "🇨🇴",
      PE: "🇵🇪",
      VE: "🇻🇪",
      UY: "🇺🇾",
      PY: "🇵🇾",
      BO: "🇧🇴",
      EC: "🇪🇨",
      GT: "🇬🇹",
      HN: "🇭🇳",
      SV: "🇸🇻",
      NI: "🇳🇮",
      CR: "🇨🇷",
      PA: "🇵🇦",
      DO: "🇩🇴",
      CU: "🇨🇺",
      PR: "🇵🇷",
      BR: "🇧🇷",
      IN: "🇮🇳",
      PK: "🇵🇰",
      BD: "🇧🇩",
      LK: "🇱🇰",
      TH: "🇹🇭",
      VN: "🇻🇳",
      ID: "🇮🇩",
      MY: "🇲🇾",
      SG: "🇸🇬",
      PH: "🇵🇭",
      TW: "🇹🇼",
      HK: "🇭🇰",
      TR: "🇹🇷",
      GR: "🇬🇷",
      IL: "🇮🇱",
      SA: "🇸🇦",
      EG: "🇪🇬",
      MA: "🇲🇦",
      DZ: "🇩🇿",
      TN: "🇹🇳",
      ZA: "🇿🇦",
      NG: "🇳🇬",
      KE: "🇰🇪",
      GH: "🇬🇭",
      ET: "🇪🇹",
      TZ: "🇹🇿",
      UG: "🇺🇬",
      ZW: "🇿🇼",
    };
    return flagMap[country.toUpperCase()] || "🌐";
  };

  const getGenderIcon = (name: string) => {
    // Simple heuristic to guess gender based on name
    const femaleNames = [
      "alice",
      "anna",
      "emma",
      "sara",
      "maria",
      "kate",
      "helen",
      "victoria",
      "karen",
      "susan",
      "sarah",
      "samantha",
      "fiona",
      "veena",
      "zuzana",
      "daria",
      "montse",
      "shelley",
      "sandy",
    ];
    const maleNames = [
      "alex",
      "daniel",
      "david",
      "thomas",
      "martin",
      "jorge",
      "fred",
      "aaron",
      "majed",
      "nicky",
      "ralph",
    ];

    const lowerName = name.toLowerCase();
    if (femaleNames.some((n) => lowerName.includes(n))) return "👩";
    if (maleNames.some((n) => lowerName.includes(n))) return "👨";
    return "🤖";
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20 ${
        isPlaying ? "ring-2 ring-primary/50 border-primary/30 bg-primary/5" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getGenderIcon(voice.name)}</span>
            <span className="truncate">{voice.name}</span>
            {isPlaying && (
              <span className="animate-pulse text-primary">🔊</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {voice.default && (
              <Badge variant="secondary" className="text-xs">
                Default
              </Badge>
            )}
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getLanguageFlag(voice.lang)}</span>
            <span className="text-sm font-medium">{voice.lang}</span>
          </div>
          <Badge
            variant={voice.localService ? "default" : "outline"}
            className="text-xs"
          >
            {voice.localService ? "Local" : "Remote"}
          </Badge>
        </div>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-3">
            <div className="border-t pt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-muted-foreground">
                  Voice Details
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-mono break-all">{voice.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-mono">{voice.lang}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Type:</span>
                  <span className="font-mono">
                    {voice.localService ? "Local" : "Remote"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Default:</span>
                  <span className="font-mono">
                    {voice.default ? "Yes" : "No"}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-muted-foreground block mb-1">
                    Voice URI:
                  </span>
                  <div className="bg-muted p-2 rounded text-xs font-mono break-all">
                    {voice.voiceURI}
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Button
          onClick={onPlay}
          className={`w-full transition-all duration-200 ${
            isPlaying
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
          variant={isPlaying ? "default" : "outline"}
          disabled={isPlaying}
        >
          {isPlaying ? (
            <>
              <Square className="h-4 w-4 mr-2 animate-pulse" />
              Playing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play Demo
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceCard;
