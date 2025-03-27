import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";


export const fetchUniqueCompanies = (
  callback: (companies: string[]) => void
) => {
  const q = query(collection(db, "users"), where("companyName", "!=", ""));
  return onSnapshot(q, (snapshot) => {
    const companySet = new Set<string>();
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.companyName) {
        companySet.add(data.companyName);
      }
    });
    callback(Array.from(companySet));
  });
};

// Fetch domains associated with a given company name
export const fetchCompanyDomains = async (
  companyName: string
): Promise<string[]> => {
  try {
    const domainsRef = collection(db, "domains");
    const q = query(domainsRef, where("companyName", "==", companyName));
    const querySnapshot = await getDocs(q);

    const domains: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.domains && Array.isArray(data.domains)) {
        domains.push(...data.domains); // Add all domains from the array
      }
    });

    return domains;
  } catch (error) {
    console.error("Error fetching domains:", error);
    return [];
  }
};

export const checkCompanyAndDomainExists = async (
  companyName: string,
  emailDomain: string
): Promise<{ companyExists: boolean; domainExists: boolean }> => {
  try {
    const normalizedCompanyName = companyName.toLowerCase();
    // Check if company name exists
    const companyQuery = query(
      collection(db, "users"),
      where("normalizedCompanyName", "==", normalizedCompanyName)
    );
    const companySnapshot = await getDocs(companyQuery);
    const companyExists = !companySnapshot.empty;

    // Check if domain exists
    const domainQuery = query(
      collection(db, "domains"),
      where("domains", "array-contains", emailDomain)
    );
    const domainSnapshot = await getDocs(domainQuery);
    const domainExists = !domainSnapshot.empty;


    return { companyExists, domainExists };
  } catch (error) {
    console.error("Error checking company/domain:", error);
    return { companyExists: false, domainExists: false };
  }
};
  