import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBuilding, FaFilter } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner/LoadingSpinner";
import { Cake, Gift, Search, UserX } from "lucide-react";

const MyTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch user's companies
  const { data: myCompanyNames = [] } = useQuery({
    enabled: !!user?.email,
    queryKey: ["my-companies", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-companies/${user?.email}`);
      return res.data;
    },
  });

  // Fetch team members for selected company
  const { data: myTeamMembers = [], isLoading } = useQuery({
    enabled: !!selectedCompany,
    queryKey: ["my-team", selectedCompany],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-team/${selectedCompany}`);
      return res.data;
    },
  });

  // FINAL FILTER (Search + Role)
  const filteredMembers = myTeamMembers.filter((member) => {
    const matchSearch =
      member.name?.toLowerCase().includes(search.toLowerCase()) ||
      member.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" || member.position === roleFilter;

    return matchSearch && matchRole;
  });

  // Filter members with birthdays in current month
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = filteredMembers.filter((member) => {
    if (!member.upcomingBirthday) return false;
    return new Date(member.upcomingBirthday).getMonth() === currentMonth;
  });

  // Format birthday date
  const formatBirthday = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/40 inline-block">
            My Team
          </h1>
          <p className="text-gray-600">
            {selectedCompany
              ? `${filteredMembers.length} team members`
              : "Select a company to view team"}
          </p>
        </div>
      </div>
      {/* SEARCH + ROLE + COMPANY */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          {/* Search */}
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Member..."
              className="w-full h-12 pl-4 pr-12 bg-gray-50 border border-[#006d6f]/30 rounded-lg
                   focus:ring-2 focus:ring-[#006d6f]/40 outline-none"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-[#006d6f]/30 rounded-lg
                   focus:ring-2 focus:ring-[#006d6f]/40 outline-none appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="employee">Employees</option>
              <option value="hr">HR Managers</option>
            </select>
          </div>

          {/* Company */}
          <div className="relative">
            <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-[#006d6f]/30 rounded-lg
                   focus:ring-2 focus:ring-[#006d6f]/40 outline-none appearance-none font-semibold"
            >
              <option value="">Select a Company</option>
              {myCompanyNames.map((company, index) => (
                <option key={index} value={company.companyName}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* {!selectedCompany && ( */}
      {selectedCompany && filteredMembers.length === 0 && (
        <div className=" p-12 text-center">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <UserX className="w-12 h-12 text-gray-400" />
            </div>

            <h3 className="text-lg font-medium text-gray-600">
              No team members found
            </h3>

            <p className="mt-2 text-sm text-gray-400 max-w-sm">
              Try adjusting your search or filter options.
            </p>
          </div>
        </div>
      )}

      {/* Team Members Grid */}
      {/* {selectedCompany && myTeamMembers.length > 0 && ( */}
      {selectedCompany && filteredMembers.length > 0 && (
        <div className="space-y-6">
          {/* Team Members Section */}
          <h2 className="text-2xl font-bold text-[#006d6f] border-b-2 border-[#006d6f]/40 inline-block mb-6 flex items-center gap-2">
            Team Members
          </h2>

          {/* TEAM GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {myTeamMembers.map((member) => ( */}
            {filteredMembers.map((member) => (
              <div
                key={member.email}
                className="p-6 bg-white border rounded-xl shadow hover:shadow-md transition bg-linear-to-br from-gray-50 to-white border-2 border-gray-200 hover:shadow-lg hover:border-[#006d6f]/30"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-full border object-cover border-2 border-[#006d6f]/20"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.email}</p>

                    <span
                      className={`mt-2 inline-flex items-center gap-1 text-xs px-3 py-1 rounded-xl inline-block text-xs font-semibold ${
                        member.position === "hr"
                          ? "bg-[#006d6f]/20 text-[#006d6f]"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {member.position === "hr" ? "HR Manager" : "Employee"}
                      {/* {member.position.toUpperCase()} */}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Birthdays Section */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-teal-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gift className="text-teal-600" />
              Upcoming Birthdays This Month
            </h2>

            {upcomingBirthdays.length === 0 ? (
              <div className="text-center py-10">
                <Cake className="text-teal-300 w-12 h-12 mx-auto mb-3" />
                <p className="text-gray-700 font-semibold">
                  No upcoming birthdays this month
                </p>
                <p className="text-gray-500 text-sm">
                  Check back next month for celebrations 🎉
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {upcomingBirthdays.map((member) => (
                  <div
                    key={member.email}
                    className="bg-white rounded-xl p-4 border border-teal-200 
                     hover:shadow-xl hover:border-teal-400 
                     transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-teal-100 shrink-0">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://i.ibb.co.com/zT4dW396/asset.webp";
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 truncate">
                          {member.name}
                        </h3>
                        <div className="flex items-center gap-1 text-teal-600 font-semibold text-sm">
                          <Cake className="w-4 h-4" />
                          <span>{formatBirthday(member.upcomingBirthday)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeam;


