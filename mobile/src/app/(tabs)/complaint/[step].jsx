import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar,
  MapPin,
  Mic,
  User,
  Camera,
  FileText,
  Upload,
  Shield,
  CheckCircle,
  Eye,
  Hash
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const steps = [
  { id: 1, title: "Incident Details", subtitle: "When and where did it happen?" },
  { id: 2, title: "Accused Details", subtitle: "Who was involved?" },
  { id: 3, title: "Evidence Upload", subtitle: "Attach supporting documents" },
  { id: 4, title: "ML Pre-Check", subtitle: "AI verification of details" },
  { id: 5, title: "Review & Submit", subtitle: "Final review before submission" }
];

function ProgressBar({ currentStep, totalSteps }) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 24 }}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: index + 1 <= currentStep ? '#1A73E8' : '#E5E7EB',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {index + 1 < currentStep ? (
              <CheckCircle size={20} color="#FFFFFF" />
            ) : (
              <Text
                style={{
                  color: index + 1 <= currentStep ? '#FFFFFF' : '#9CA3AF',
                  fontWeight: '600',
                  fontSize: 14,
                }}
              >
                {index + 1}
              </Text>
            )}
          </View>
          {index < totalSteps - 1 && (
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: index + 1 < currentStep ? '#1A73E8' : '#E5E7EB',
                marginHorizontal: 8,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}

function StepOne({ data, onUpdate }) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Incident Details
      </Text>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Date of Incident
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#D1D5DB',
            borderRadius: 12,
            padding: 16,
          }}
        >
          <Calendar size={20} color="#6B7280" />
          <Text style={{ marginLeft: 12, color: data.date ? '#111827' : '#9CA3AF' }}>
            {data.date || 'Select date'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Location
        </Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 12,
              padding: 16,
              paddingLeft: 48,
              fontSize: 16,
              color: '#111827',
            }}
            placeholder="Where did the incident occur?"
            value={data.location}
            onChangeText={(text) => onUpdate({ location: text })}
          />
          <MapPin 
            size={20} 
            color="#6B7280" 
            style={{ position: 'absolute', left: 16, top: 18 }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Description of Incident
        </Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 12,
              padding: 16,
              paddingRight: 48,
              fontSize: 16,
              color: '#111827',
              minHeight: 100,
              textAlignVertical: 'top',
            }}
            placeholder="Describe what happened in detail..."
            value={data.description}
            onChangeText={(text) => onUpdate({ description: text })}
            multiline
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 16, top: 16 }}
            onPress={() => Haptics.lightAsync()}
          >
            <Mic size={20} color="#1A73E8" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function StepTwo({ data, onUpdate }) {
  const [accusedList, setAccusedList] = useState(data.accused || [{}]);

  const addAccused = () => {
    setAccusedList([...accusedList, {}]);
    onUpdate({ accused: [...accusedList, {}] });
  };

  const updateAccused = (index, field, value) => {
    const updated = [...accusedList];
    updated[index] = { ...updated[index], [field]: value };
    setAccusedList(updated);
    onUpdate({ accused: updated });
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Accused Details
      </Text>

      {accusedList.map((accused, index) => (
        <View key={index} style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#374151', marginBottom: 12 }}>
            Accused Person {index + 1}
          </Text>
          
          <View style={{ marginBottom: 12 }}>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                color: '#111827',
              }}
              placeholder="Name (if known)"
              value={accused.name}
              onChangeText={(text) => updateAccused(index, 'name', text)}
            />
          </View>

          <View style={{ marginBottom: 12 }}>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 12,
                padding: 16,
                fontSize: 16,
                color: '#111827',
              }}
              placeholder="Relation to you"
              value={accused.relation}
              onChangeText={(text) => updateAccused(index, 'relation', text)}
            />
          </View>

          <TextInput
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#D1D5DB',
              borderRadius: 12,
              padding: 16,
              fontSize: 16,
              color: '#111827',
              minHeight: 80,
              textAlignVertical: 'top',
            }}
            placeholder="Brief description"
            value={accused.description}
            onChangeText={(text) => updateAccused(index, 'description', text)}
            multiline
          />
        </View>
      ))}

      <TouchableOpacity
        onPress={addAccused}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F3F4F6',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: '#D1D5DB',
          borderStyle: 'dashed',
        }}
      >
        <User size={20} color="#6B7280" />
        <Text style={{ marginLeft: 8, color: '#6B7280', fontWeight: '500' }}>
          Add Another Person
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function StepThree({ data, onUpdate }) {
  const [evidence, setEvidence] = useState(data.evidence || []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newEvidence = [...evidence, { type: 'image', uri: result.assets[0].uri, name: 'Image' }];
      setEvidence(newEvidence);
      onUpdate({ evidence: newEvidence });
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const newEvidence = [...evidence, { type: 'document', uri: result.assets[0].uri, name: result.assets[0].name }];
      setEvidence(newEvidence);
      onUpdate({ evidence: newEvidence });
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Evidence Upload
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 24 }}>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1A73E8',
            borderRadius: 12,
            padding: 16,
            marginRight: 8,
          }}
        >
          <Camera size={20} color="#FFFFFF" />
          <Text style={{ marginLeft: 8, color: '#FFFFFF', fontWeight: '500' }}>
            Photo/Video
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={pickDocument}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#10B981',
            borderRadius: 12,
            padding: 16,
            marginLeft: 8,
          }}
        >
          <FileText size={20} color="#FFFFFF" />
          <Text style={{ marginLeft: 8, color: '#FFFFFF', fontWeight: '500' }}>
            Document
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F59E0B',
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <Upload size={20} color="#FFFFFF" />
        <Text style={{ marginLeft: 8, color: '#FFFFFF', fontWeight: '500' }}>
          Attach from DigiLocker
        </Text>
      </TouchableOpacity>

      {evidence.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
          }}
        >
          <FileText size={20} color="#6B7280" />
          <Text style={{ flex: 1, marginLeft: 12, color: '#374151' }}>
            {item.name}
          </Text>
          <CheckCircle size={20} color="#10B981" />
        </View>
      ))}
    </View>
  );
}

function StepFour({ data }) {
  const [mlResult] = useState({
    act: 'Prevention of Atrocities Act (PoA)',
    confidence: 87,
    reasons: ['Caste-based discrimination keywords detected', 'Location pattern matches historical data', 'Incident type classification'],
    needsReview: false
  });

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        ML Pre-Check Results
      </Text>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Shield size={24} color="#1A73E8" />
          <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#111827' }}>
            Act Classification
          </Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1A73E8', marginBottom: 8 }}>
          {mlResult.act}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Confidence Score: 
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#10B981', marginLeft: 4 }}>
            {mlResult.confidence}%
          </Text>
        </View>

        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Analysis Reasons:
        </Text>
        {mlResult.reasons.map((reason, index) => (
          <Text key={index} style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
            • {reason}
          </Text>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: mlResult.needsReview ? '#FEF3C7' : '#ECFDF5',
          borderRadius: 12,
          padding: 16,
        }}
      >
        <CheckCircle size={20} color={mlResult.needsReview ? '#F59E0B' : '#10B981'} />
        <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '500', color: '#111827' }}>
          {mlResult.needsReview ? 'Needs Human Review' : 'Ready for Submission'}
        </Text>
      </View>
    </View>
  );
}

function StepFive({ data }) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Review & Submit
      </Text>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 12 }}>
          FIR Draft Summary
        </Text>
        
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Date:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>{data.date || 'Not specified'}</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Location:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>{data.location || 'Not specified'}</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Description:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>{data.description || 'Not provided'}</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>
            Accused: {data.accused?.length || 0} person(s)
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>
            Evidence: {data.evidence?.length || 0} file(s)
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#1A73E8',
          borderRadius: 12,
          padding: 18,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
          Submit to Police (CCTNS)
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
        By submitting, you agree to share this information with law enforcement agencies
      </Text>
    </View>
  );
}

export default function ComplaintWizard() {
  const { step } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentStep = parseInt(step);
  
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    description: '',
    accused: [{}],
    evidence: []
  });

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const goNext = () => {
    if (currentStep < 5) {
      Haptics.lightAsync();
      router.push(`/complaint/${currentStep + 1}`);
    } else {
      // Submit and show success
      Alert.alert(
        'Success!',
        'Claim ID NYS-2025-0012 created',
        [
          {
            text: 'OK',
            onPress: () => router.push('/dashboard')
          }
        ]
      );
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      Haptics.lightAsync();
      router.push(`/complaint/${currentStep - 1}`);
    } else {
      router.back();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne data={formData} onUpdate={updateFormData} />;
      case 2:
        return <StepTwo data={formData} onUpdate={updateFormData} />;
      case 3:
        return <StepThree data={formData} onUpdate={updateFormData} />;
      case 4:
        return <StepFour data={formData} />;
      case 5:
        return <StepFive data={formData} />;
      default:
        return <StepOne data={formData} onUpdate={updateFormData} />;
    }
  };

  const currentStepInfo = steps.find(s => s.id === currentStep);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={goBack} style={{ marginRight: 16 }}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827' }}>
              {currentStepInfo?.title}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              {currentStepInfo?.subtitle}
            </Text>
          </View>
        </View>

        <ProgressBar currentStep={currentStep} totalSteps={5} />
      </View>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
        }}
      >
        <TouchableOpacity
          onPress={goNext}
          style={{
            backgroundColor: '#1A73E8',
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginRight: 8 }}>
            {currentStep === 5 ? 'Submit Complaint' : 'Continue'}
          </Text>
          {currentStep < 5 && <ArrowRight size={20} color="#FFFFFF" />}
          {currentStep === 5 && <Hash size={20} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}