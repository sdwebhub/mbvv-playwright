export interface OwnerDetails {
  policeStation: string;
  photo: string;
  fullName: string;
  contactNo: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface RentedSpaceDetails {
  address: string;
  city: string;
  state: string;
  pinCode: string;
  agreementStartDate: string; // MMDDYYYY
  agreementEndDate: string;   // MMDDYYYY
}

export interface TenantDetails {
  citizenType: string;
  photo: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  identityProof: string;
  identityProofNumber: string;
  identityProofFile: string;
  coResidents: { male: string; female: string; children: string };
}

export interface TenantPlaceOfWork {
  mobileNumber: string;
  email: string;
  occupation: string;
  placeOfWork: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface PeopleWhoKnowTenant {
  person1Name: string;
  person1Contact: string;
  person2Name: string;
  person2Contact: string;
  agentName: string;
  agentDetails: string;
}

export interface TenantCase {
  caseName: string;
  owner: OwnerDetails;
  rentedSpace: RentedSpaceDetails;
  tenant: TenantDetails;
  placeOfWork: TenantPlaceOfWork;
  peopleWhoKnow: PeopleWhoKnowTenant;
}
