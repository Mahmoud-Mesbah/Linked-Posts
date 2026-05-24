

import {User,Mail,Calendar,Shield, } from "lucide-react";
  
  export default function Settings() {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    
    );
  
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-3xl font-bold mb-8">
            Settings
          </h1>
  
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-2xl">
              <User className="text-blue-600" />
  
              <div>
                <h3 className="font-semibold">
                  Full Name
                </h3>
  
                <p className="text-gray-500">
                  {user?.name || "Unknown"}
                </p>
              </div>
            </div>
  
            <div className="flex items-center gap-4 p-4 border rounded-2xl">
              <Mail className="text-blue-600" />
  
              <div>
                <h3 className="font-semibold">
                  Email Address
                </h3>
  
                <p className="text-gray-500">
                  {user?.email || "Unknown"}
                </p>
              </div>
            </div>
  
            <div className="flex items-center gap-4 p-4 border rounded-2xl">
              <Calendar className="text-blue-600" />
  
              <div>
                <h3 className="font-semibold">
                  Date Of Birth
                </h3>
  
                <p className="text-gray-500">
                  {user?.dateOfBirth
                    ? new Date(
                        user.dateOfBirth
                      ).toLocaleDateString()
                    : "Not Available"}
                </p>
              </div>
            </div>
  
            <div className="flex items-center gap-4 p-4 border rounded-2xl">
              <Shield className="text-blue-600" />
  
              <div>
                <h3 className="font-semibold">
                  Account Status
                </h3>
  
                <p className="text-green-600">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }