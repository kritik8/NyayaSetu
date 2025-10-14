import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { 
  ArrowLeft, 
  ArrowRight,
  Heart,
  Shield,
  CheckCircle,
  FileText,
  User,
  Hash,
  Download
} from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";

const steps = [
  { id: 1, title: "Application Type", subtitle: "Inter-Caste Marriage Incentive" },
  { id: 2, title: "Document Verification", subtitle: "DigiLocker certificate retrieval" },
  { id: 3, title: "Partner Details", subtitle: "Spouse information & consent" },
  { id: 4, title: "ML Verification", subtitle: "Document authenticity check" },
  { id: 5, title: "Submit Application", subtitle: "Final submission" }
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

function StepOne() {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Application Type
      </Text>
      
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Heart size={24} color="#10B981" />
          <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#111827' }}>
            Inter-Caste Marriage Incentive
          </Text>
        </View>

        <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 16, lineHeight: 20 }}>
          Apply for Direct Benefit Transfer (DBT) under the inter-caste marriage incentive scheme. 
          This program supports couples who have married across caste boundaries.
        </Text>

        <View style={{ backgroundColor: '#F3F4F6', borderRadius: 12, padding: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
            Eligibility Requirements:
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
            • Valid marriage certificate
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
            • Verified caste certificates for both spouses
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
            • Marriage within last 2 years
          </Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            • Annual household income below ₹5 lakhs
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#EBF8FF',
          borderRadius: 12,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: '#1A73E8',
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#1A73E8', marginBottom: 4 }}>
          Incentive Amount
        </Text>
        <Text style={{ fontSize: 14, color: '#1A73E8' }}>
          Up to ₹2,50,000 as one-time financial assistance
        </Text>
      </View>
    </View>
  );
}

function StepTwo() {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState(null);

  const retrieveDocuments = async () => {
    setLoading(true);
    Haptics.lightAsync();
    
    // Simulate DigiLocker retrieval
    setTimeout(() => {
      setDocuments({
        marriageCertificate: {
          number: 'MC-2024-KA-123456',
          date: '2024-02-14',
          place: 'Bangalore, Karnataka',
          verified: true
        },
        applicantCaste: {
          category: 'SC',
          certificate: 'SC-2023-KA-789123',
          verified: true
        },
        spouseCaste: {
          category: 'General',
          certificate: 'GEN-2023-KA-456789',
          verified: true
        }
      });
      setLoading(false);
      Haptics.successAsync();
    }, 2000);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Document Verification
      </Text>

      {!documents ? (
        <View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Download size={24} color="#1A73E8" />
              <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#111827' }}>
                DigiLocker Integration
              </Text>
            </View>

            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>
              We'll securely retrieve your verified documents from DigiLocker:
            </Text>

            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
              • Marriage Certificate
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
              • Your Caste Certificate
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 16 }}>
              • Spouse's Caste Certificate
            </Text>

            <TouchableOpacity
              onPress={retrieveDocuments}
              disabled={loading}
              style={{
                backgroundColor: loading ? '#9CA3AF' : '#1A73E8',
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
                {loading ? 'Retrieving Documents...' : 'Retrieve from DigiLocker'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#FEF3C7',
              borderRadius: 12,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#F59E0B',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#92400E', marginBottom: 4 }}>
              Privacy Notice
            </Text>
            <Text style={{ fontSize: 14, color: '#A16207' }}>
              Your Aadhaar number will not be stored. Only verified document details are retrieved.
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <FileText size={20} color="#10B981" />
              <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#111827' }}>
                Marriage Certificate
              </Text>
              <CheckCircle size={20} color="#10B981" style={{ marginLeft: 'auto' }} />
            </View>
            
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
              Certificate No: {documents.marriageCertificate.number}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
              Date: {documents.marriageCertificate.date}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Place: {documents.marriageCertificate.place}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <User size={20} color="#1A73E8" />
              <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#111827' }}>
                Your Caste Certificate
              </Text>
              <CheckCircle size={20} color="#10B981" style={{ marginLeft: 'auto' }} />
            </View>
            
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
              Category: {documents.applicantCaste.category}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Certificate: {documents.applicantCaste.certificate}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <User size={20} color="#8B5CF6" />
              <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '600', color: '#111827' }}>
                Spouse's Caste Certificate
              </Text>
              <CheckCircle size={20} color="#10B981" style={{ marginLeft: 'auto' }} />
            </View>
            
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>
              Category: {documents.spouseCaste.category}
            </Text>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>
              Certificate: {documents.spouseCaste.certificate}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

function StepThree({ data, onUpdate }) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Partner Details
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Spouse's Full Name
        </Text>
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
          placeholder="Enter spouse's full name"
          value={data.spouseName}
          onChangeText={(text) => onUpdate({ spouseName: text })}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Spouse's Aadhaar Number
        </Text>
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
          placeholder="XXXX-XXXX-XXXX"
          value={data.spouseAadhaar}
          onChangeText={(text) => onUpdate({ spouseAadhaar: text })}
          keyboardType="numeric"
          maxLength={14}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Contact Number
        </Text>
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
          placeholder="Enter contact number"
          value={data.spousePhone}
          onChangeText={(text) => onUpdate({ spousePhone: text })}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
          Current Address
        </Text>
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
          placeholder="Enter current residential address"
          value={data.currentAddress}
          onChangeText={(text) => onUpdate({ currentAddress: text })}
          multiline
        />
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Switch
            value={data.mutualConsent}
            onValueChange={(value) => onUpdate({ mutualConsent: value })}
            trackColor={{ false: '#D1D5DB', true: '#1A73E8' }}
            thumbColor={'#FFFFFF'}
          />
          <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '500', color: '#111827', flex: 1 }}>
            Mutual Consent Declaration
          </Text>
        </View>
        
        <Text style={{ fontSize: 14, color: '#6B7280', lineHeight: 20 }}>
          I hereby declare that both parties have given their free and mutual consent for this marriage, 
          and no coercion or pressure was involved in this decision.
        </Text>
      </View>
    </View>
  );
}

function StepFour() {
  const [mlResult] = useState({
    marriageCertificateAuth: 93,
    casteVerification: 97,
    crossVerification: 89,
    overallScore: 92,
    authentic: true
  });

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        ML Verification Results
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
            Document Authenticity Check
          </Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Marriage Certificate</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#10B981' }}>
              {mlResult.marriageCertificateAuth}% authentic
            </Text>
          </View>
          <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3 }}>
            <View
              style={{
                height: 6,
                backgroundColor: '#10B981',
                borderRadius: 3,
                width: `${mlResult.marriageCertificateAuth}%`,
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Caste Verification</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#10B981' }}>
              {mlResult.casteVerification}% verified
            </Text>
          </View>
          <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3 }}>
            <View
              style={{
                height: 6,
                backgroundColor: '#10B981',
                borderRadius: 3,
                width: `${mlResult.casteVerification}%`,
              }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Cross Verification</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#10B981' }}>
              {mlResult.crossVerification}% match
            </Text>
          </View>
          <View style={{ height: 6, backgroundColor: '#F3F4F6', borderRadius: 3 }}>
            <View
              style={{
                height: 6,
                backgroundColor: '#10B981',
                borderRadius: 3,
                width: `${mlResult.crossVerification}%`,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ECFDF5',
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
          }}
        >
          <CheckCircle size={20} color="#10B981" />
          <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '600', color: '#111827' }}>
            Overall Score: {mlResult.overallScore}% - Documents Verified
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#EBF8FF',
          borderRadius: 12,
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: '#1A73E8',
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#1A73E8', marginBottom: 4 }}>
          Verification Complete
        </Text>
        <Text style={{ fontSize: 14, color: '#1A73E8' }}>
          All documents have been successfully verified and are ready for submission
        </Text>
      </View>
    </View>
  );
}

function StepFive({ data }) {
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 20 }}>
        Submit Application
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
          Application Summary
        </Text>
        
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Application Type:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>Inter-Caste Marriage Incentive</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Spouse Name:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>{data.spouseName || 'Not provided'}</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Documents:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>Marriage Certificate ✓</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>Caste Certificates ✓</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Verification:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>ML Authenticity Check ✓</Text>
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151' }}>Consent:</Text>
          <Text style={{ fontSize: 14, color: '#6B7280' }}>
            Mutual Consent {data.mutualConsent ? '✓' : '✗'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#10B981',
          borderRadius: 12,
          padding: 18,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
          Submit Application for DBT
        </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
        By submitting, you agree to the terms and conditions of the inter-caste marriage incentive scheme
      </Text>
    </View>
  );
}

export default function MarriageWizard() {
  const { step } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentStep = parseInt(step);
  
  const [formData, setFormData] = useState({
    spouseName: '',
    spouseAadhaar: '',
    spousePhone: '',
    currentAddress: '',
    mutualConsent: false
  });

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const goNext = () => {
    if (currentStep < 5) {
      Haptics.lightAsync();
      router.push(`/marriage/${currentStep + 1}`);
    } else {
      // Submit and show success
      Alert.alert(
        'Success!',
        'Incentive request submitted with blockchain hash badge',
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
      router.push(`/marriage/${currentStep - 1}`);
    } else {
      router.back();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree data={formData} onUpdate={updateFormData} />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive data={formData} />;
      default:
        return <StepOne />;
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
            backgroundColor: '#10B981',
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginRight: 8 }}>
            {currentStep === 5 ? 'Submit Application' : 'Continue'}
          </Text>
          {currentStep < 5 && <ArrowRight size={20} color="#FFFFFF" />}
          {currentStep === 5 && <Hash size={20} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}