import { useEffect, useState } from "react";
import { fetchUniqueCompanies } from "../firebase/companies";


export const useCompanyDropdown = () => {
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = fetchUniqueCompanies((companyList) => {
      setCompanies(companyList);
      setFilteredCompanies(companyList);
    });
    return () => unsubscribe();
  }, []);

  const filterCompanies = (searchTerm: string) => {
    const filtered = companies.filter((company) =>
      company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  return { filteredCompanies, filterCompanies };
};
