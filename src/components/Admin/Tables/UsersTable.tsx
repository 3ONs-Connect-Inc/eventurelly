import { User } from "../../../types";
import { format } from "date-fns";
import { AdminTable, Column } from "./AdminTable";
import { Button } from "../ui/Button";
import { Eye} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import { useState } from "react";


export const UsersTable: React.FC<{ users: User[] }> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const userColumns: Column<User>[] = [
    {
      header: "#",
      render: (_, index) => index + 1,
      className: "w-12 text-center",
    },
    { header: "Company", accessor: "companyName", className: "w-36 truncate" },
    { header: "Email", accessor: "email", className: "w-50 truncate" },
    { header: "Phone", accessor: "phoneNumber", className: "w-25 truncate" },
    { header: "Role", accessor: "role", className: "w-40" },
    {
      header: "Verified",
      render: (user) => (user.emailVerified ? "Yes" : "No"),
      className: "w-20",
    },
    {
      header: "Joined",
      render: (user) =>
        user.timestamp?.toDate ? format(user.timestamp.toDate(), "MMM dd, yyyy") : "N/A",
      className: "w-48",
    },
    {
      header: "Actions",
      render: (user) =>
        user.id && (
          <div className="flex items-center">
            <Button
              aria-label="view button"
              className="text-blue-500 dark:text-blue-600"
              onClick={() => setSelectedUser(user)}
            >
              <Eye size={20} />
            </Button>
          </div>
        ),
      className: "w-32",
    },
  ];

  return (
    <>
      <AdminTable title="All Users" data={users} columns={userColumns} rowKey={(u) => u.id} />

      <Dialog open={!!selectedUser} onClose={() => setSelectedUser(null)}>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              {selectedUser && (
                <div className="space-y-2 text-sm">
                  <p><strong>Company:</strong> {selectedUser.companyName}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Verified:</strong> {selectedUser.emailVerified ? "Yes" : "No"}</p>
                  <p><strong>Joined:</strong> {selectedUser.timestamp?.toDate ? format(selectedUser.timestamp.toDate(), "PPP") : "N/A"}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};