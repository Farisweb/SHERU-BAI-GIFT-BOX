// Comprehensive Indian PIN Code Serviceability & City/State Resolver
export const checkPinCodeServiceability = (pincode) => {
  const cleanPin = (pincode || '').toString().trim();
  
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      isValid: false,
      isServiceable: false,
      message: 'Please enter a valid 6-digit Indian PIN code'
    };
  }

  const prefix = cleanPin.substring(0, 2);
  let state = 'India';
  let estimatedDays = '3 - 5 Days';
  let tier = 'Standard Express';

  // Major Postal Zones mapping
  const zoneMap = {
    '11': { state: 'Delhi NCR', days: '2 - 3 Days', tier: 'Metro Priority' },
    '12': { state: 'Haryana', days: '2 - 4 Days', tier: 'Express' },
    '13': { state: 'Haryana', days: '2 - 4 Days', tier: 'Express' },
    '14': { state: 'Punjab', days: '3 - 4 Days', tier: 'Express' },
    '15': { state: 'Punjab', days: '3 - 4 Days', tier: 'Express' },
    '16': { state: 'Chandigarh', days: '2 - 3 Days', tier: 'Metro Priority' },
    '17': { state: 'Himachal Pradesh', days: '4 - 5 Days', tier: 'Hilly Express' },
    '18': { state: 'Jammu & Kashmir', days: '4 - 6 Days', tier: 'Special Express' },
    '19': { state: 'Jammu & Kashmir', days: '4 - 6 Days', tier: 'Special Express' },
    '20': { state: 'Uttar Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '21': { state: 'Uttar Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '22': { state: 'Uttar Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '24': { state: 'Uttarakhand', days: '3 - 5 Days', tier: 'Express' },
    '25': { state: 'Uttar Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '26': { state: 'Uttarakhand', days: '3 - 5 Days', tier: 'Express' },
    '27': { state: 'Uttar Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '28': { state: 'Uttar Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '30': { state: 'Rajasthan', days: '3 - 4 Days', tier: 'Express' },
    '31': { state: 'Rajasthan', days: '3 - 4 Days', tier: 'Express' },
    '32': { state: 'Rajasthan', days: '3 - 4 Days', tier: 'Express' },
    '33': { state: 'Rajasthan', days: '3 - 4 Days', tier: 'Express' },
    '34': { state: 'Rajasthan', days: '3 - 4 Days', tier: 'Express' },
    '36': { state: 'Gujarat', days: '3 - 4 Days', tier: 'Express' },
    '37': { state: 'Gujarat', days: '3 - 4 Days', tier: 'Express' },
    '38': { state: 'Gujarat (Ahmedabad)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '39': { state: 'Gujarat (Surat)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '40': { state: 'Maharashtra (Mumbai)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '41': { state: 'Maharashtra (Pune)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '42': { state: 'Maharashtra', days: '3 - 4 Days', tier: 'Express' },
    '43': { state: 'Maharashtra', days: '3 - 4 Days', tier: 'Express' },
    '44': { state: 'Maharashtra (Nagpur)', days: '3 - 4 Days', tier: 'Express' },
    '45': { state: 'Madhya Pradesh (Indore)', days: '3 - 4 Days', tier: 'Express' },
    '46': { state: 'Madhya Pradesh (Bhopal)', days: '3 - 4 Days', tier: 'Express' },
    '47': { state: 'Madhya Pradesh', days: '3 - 5 Days', tier: 'Express' },
    '48': { state: 'Madhya Pradesh', days: '3 - 5 Days', tier: 'Express' },
    '49': { state: 'Chhattisgarh', days: '3 - 5 Days', tier: 'Express' },
    '50': { state: 'Telangana (Hyderabad)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '51': { state: 'Andhra Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '52': { state: 'Andhra Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '53': { state: 'Andhra Pradesh', days: '3 - 4 Days', tier: 'Express' },
    '56': { state: 'Karnataka (Bengaluru)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '57': { state: 'Karnataka', days: '3 - 4 Days', tier: 'Express' },
    '58': { state: 'Karnataka', days: '3 - 4 Days', tier: 'Express' },
    '59': { state: 'Karnataka', days: '3 - 4 Days', tier: 'Express' },
    '60': { state: 'Tamil Nadu (Chennai)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '61': { state: 'Tamil Nadu', days: '3 - 4 Days', tier: 'Express' },
    '62': { state: 'Tamil Nadu (Madurai)', days: '3 - 4 Days', tier: 'Express' },
    '63': { state: 'Tamil Nadu', days: '3 - 4 Days', tier: 'Express' },
    '64': { state: 'Tamil Nadu (Coimbatore)', days: '3 - 4 Days', tier: 'Express' },
    '67': { state: 'Kerala', days: '3 - 4 Days', tier: 'Express' },
    '68': { state: 'Kerala (Kochi)', days: '3 - 4 Days', tier: 'Express' },
    '69': { state: 'Kerala (Trivandrum)', days: '3 - 4 Days', tier: 'Express' },
    '70': { state: 'West Bengal (Kolkata)', days: '2 - 3 Days', tier: 'Metro Priority' },
    '71': { state: 'West Bengal', days: '3 - 4 Days', tier: 'Express' },
    '72': { state: 'West Bengal', days: '3 - 4 Days', tier: 'Express' },
    '73': { state: 'West Bengal', days: '3 - 4 Days', tier: 'Express' },
    '74': { state: 'West Bengal', days: '3 - 4 Days', tier: 'Express' },
    '75': { state: 'Odisha (Bhubaneswar)', days: '3 - 4 Days', tier: 'Express' },
    '76': { state: 'Odisha', days: '3 - 5 Days', tier: 'Express' },
    '77': { state: 'Odisha', days: '3 - 5 Days', tier: 'Express' },
    '78': { state: 'Assam / North East', days: '4 - 6 Days', tier: 'Air Express' },
    '79': { state: 'North East States', days: '4 - 6 Days', tier: 'Air Express' },
    '80': { state: 'Bihar (Patna)', days: '3 - 4 Days', tier: 'Express' },
    '81': { state: 'Bihar', days: '3 - 5 Days', tier: 'Express' },
    '82': { state: 'Bihar', days: '3 - 5 Days', tier: 'Express' },
    '83': { state: 'Jharkhand (Ranchi)', days: '3 - 4 Days', tier: 'Express' },
    '84': { state: 'Bihar', days: '3 - 5 Days', tier: 'Express' },
    '85': { state: 'Bihar', days: '3 - 5 Days', tier: 'Express' },
  };

  const zone = zoneMap[prefix];
  if (zone) {
    state = zone.state;
    estimatedDays = zone.days;
    tier = zone.tier;
  }

  // Sheru Bai delivers across 100% of serviceable Indian PINs
  return {
    isValid: true,
    isServiceable: true,
    state,
    estimatedDays,
    courier: 'Bluedart & Delhivery Air Express',
    shippingCost: 0, // Free Delivery Nationwide
    message: `Delivery available in ${state} (${estimatedDays}) with Free Express Shipping!`
  };
};
