import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { 
  User,
  Shield,
  Bell,
  Globe,
  Accessibility,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  X,
  Eye,
  EyeOff,
  Volume2,
  Type,
  Contrast
} from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const consentData = [
  {
    id: 'digilocker',
    title: 'DigiLocker Access',
    description: 'Allow secure document retrieval from DigiLocker',
    granted: true,
    essential: true,
    grantedDate: '2025-01-15'
  },
  {
    id: 'fir_submission',
    title: 'FIR Submission to CCTNS',
    description: 'Share complaint data with police verification system',
    granted: true,
    essential: true,
    grantedDate: '2025-01-15'
  },
  {
    id: 'grievance',
    title: 'Grievance Redressal',
    description: 'Allow communication for issue resolution',
    granted: true,
    essential: false,
    grantedDate: '2025-01-15'
  },
  {
    id: 'analytics',
    title: 'Usage Analytics',
    description: 'Help improve app performance and user experience',
    granted: false,
    essential: false,
    grantedDate: null
  }
];

const languages = [
  { code: 'en', name: 'English', selected: true },
  { code: 'hi', name: 'हिंदी (Hindi)', selected: false },
  { code: 'te', name: 'తెలుగు (Telugu)', selected: false }
];

function SettingItem({ icon: Icon, title, subtitle, onPress, trailing, showChevron = true }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: '#F3F4F6',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Icon size={20} color="#6B7280" />
      </View>
      
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#111827', marginBottom: 2 }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            {subtitle}
          </Text>
        )}
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {trailing}
        {showChevron && <ChevronRight size={20} color="#9CA3AF" style={{ marginLeft: 8 }} />}
      </View>
    </TouchableOpacity>
  );
}

function ConsentCard({ consent, onToggle }) {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: consent.granted ? '#D1FAE5' : '#F3F4F6',
        borderLeftWidth: 4,
        borderLeftColor: consent.granted ? '#10B981' : '#E5E7EB',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 4 }}>
            {consent.title}
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>
            {consent.description}
          </Text>
        </View>
        
        <Switch
          value={consent.granted}
          onValueChange={onToggle}
          disabled={consent.essential}
          trackColor={{ false: '#D1D5DB', true: '#10B981' }}
          thumbColor={'#FFFFFF'}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {consent.granted ? (
            <Check size={16} color="#10B981" />
          ) : (
            <X size={16} color="#EF4444" />
          )}
          <Text style={{ fontSize: 12, color: '#6B7280', marginLeft: 4 }}>
            {consent.granted ? 'Granted' : 'Not granted'}
          </Text>
        </View>
        
        {consent.essential && (
          <Text style={{ fontSize: 12, color: '#F59E0B', fontWeight: '500' }}>
            Required
          </Text>
        )}
        
        {consent.grantedDate && (
          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
            Since {consent.grantedDate}
          </Text>
        )}
      </View>
    </View>
  );
}

function AccessibilitySettings({ settings, onUpdate }) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
        Accessibility Settings
      </Text>

      <SettingItem
        icon={Contrast}
        title="High Contrast Mode"
        subtitle="Improve text and UI visibility"
        trailing={
          <Switch
            value={settings.highContrast}
            onValueChange={(value) => onUpdate({ highContrast: value })}
            trackColor={{ false: '#D1D5DB', true: '#1A73E8' }}
            thumbColor={'#FFFFFF'}
          />
        }
        showChevron={false}
      />

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: '#F3F4F6',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#F3F4F6',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <Type size={20} color="#6B7280" />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#111827' }}>
            Font Size
          </Text>
        </View>
        
        <View style={{ paddingHorizontal: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Small</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Large</Text>
          </View>
          <View
            style={{
              height: 6,
              backgroundColor: '#F3F4F6',
              borderRadius: 3,
              position: 'relative',
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: `${(settings.fontSize - 12) / (20 - 12) * 100}%`,
                top: -5,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: '#1A73E8',
                transform: [{ translateX: -8 }],
              }}
            />
          </View>
          <Text style={{ fontSize: 14, color: '#374151', textAlign: 'center', marginTop: 8 }}>
            Current: {settings.fontSize}px
          </Text>
        </View>
      </View>

      <SettingItem
        icon={Volume2}
        title="Voice Assistance"
        subtitle="Enable voice commands and audio feedback"
        trailing={
          <Switch
            value={settings.voiceAssist}
            onValueChange={(value) => onUpdate({ voiceAssist: value })}
            trackColor={{ false: '#D1D5DB', true: '#1A73E8' }}
            thumbColor={'#FFFFFF'}
          />
        }
        showChevron={false}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [consents, setConsents] = useState(consentData);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    fontSize: 16,
    voiceAssist: false
  });

  const handleConsentToggle = (consentId) => {
    const consent = consents.find(c => c.id === consentId);
    if (consent.essential) {
      Alert.alert(
        'Required Permission',
        'This permission is required for the app to function properly and cannot be disabled.',
        [{ text: 'OK' }]
      );
      return;
    }

    Haptics.lightAsync();
    setConsents(prev =>
      prev.map(c =>
        c.id === consentId
          ? { ...c, granted: !c.granted, grantedDate: !c.granted ? new Date().toISOString().split('T')[0] : null }
          : c
      )
    );
  };

  const handleLanguageSelect = () => {
    Haptics.lightAsync();
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      languages.map(lang => ({
        text: lang.name,
        onPress: () => {
          setSelectedLanguage(lang.code);
          Haptics.successAsync();
        }
      }))
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of NyayaSetu?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            Haptics.lightAsync();
            // Navigate to onboarding or login
            router.push('/dashboard');
          }
        }
      ]
    );
  };

  const updateAccessibilitySettings = (updates) => {
    setAccessibilitySettings(prev => ({ ...prev, ...updates }));
    Haptics.lightAsync();
  };

  const currentLanguage = languages.find(l => l.code === selectedLanguage);

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 8 }}>
          Settings
        </Text>
        <Text style={{ fontSize: 14, color: '#6B7280' }}>
          Manage your account and app preferences
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 }}>
          Account
        </Text>

        <SettingItem
          icon={User}
          title="Profile Information"
          subtitle="Suman Devi • ID: ****7890"
          onPress={() => Haptics.lightAsync()}
        />

        <SettingItem
          icon={Shield}
          title="Privacy & Security"
          subtitle="Manage data protection settings"
          onPress={() => Haptics.lightAsync()}
        />

        {/* Consent Dashboard */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginTop: 32, marginBottom: 16 }}>
          Consent Dashboard
        </Text>

        {consents.map((consent) => (
          <ConsentCard
            key={consent.id}
            consent={consent}
            onToggle={() => handleConsentToggle(consent.id)}
          />
        ))}

        {/* App Preferences */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginTop: 32, marginBottom: 16 }}>
          App Preferences
        </Text>

        <SettingItem
          icon={Globe}
          title="Language"
          subtitle={currentLanguage?.name}
          onPress={handleLanguageSelect}
        />

        <SettingItem
          icon={Bell}
          title="Notifications"
          subtitle="Push notifications and alerts"
          trailing={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#D1D5DB', true: '#1A73E8' }}
              thumbColor={'#FFFFFF'}
            />
          }
          showChevron={false}
        />

        {/* Accessibility */}
        <View style={{ marginTop: 32 }}>
          <AccessibilitySettings
            settings={accessibilitySettings}
            onUpdate={updateAccessibilitySettings}
          />
        </View>

        {/* Support Section */}
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginTop: 32, marginBottom: 16 }}>
          Support
        </Text>

        <SettingItem
          icon={HelpCircle}
          title="Help & Support"
          subtitle="FAQs, contact support, tutorials"
          onPress={() => {
            Haptics.lightAsync();
            router.push('/help');
          }}
        />

        {/* Logout */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#FEE2E2',
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: '#FEE2E2',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <LogOut size={20} color="#EF4444" />
          </View>
          
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#EF4444', flex: 1 }}>
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* App Info */}
        <View
          style={{
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            padding: 16,
            marginTop: 24,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 4 }}>
            NyayaSetu - Bridge to Justice
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280' }}>
            Version 1.0.0 • Build 2025.01.15
          </Text>
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 8, textAlign: 'center' }}>
            A privacy-first platform for caste discrimination reporting and inter-caste marriage incentives
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}