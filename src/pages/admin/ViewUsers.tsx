import { useUsers } from "../../components/Admin/hooks/useUsers";
import {UsersTable} from "../../components/Admin/Tables/UsersTable";

const ViewUsers: React.FC = () => {
    const { users, loading } = useUsers();
  
    return (
        <div className="flex flex-col gap-y-4">
        <h2 className="title">
          All Users
        </h2>
  
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UsersTable users={users} />
        )}
      </div>
    );
  };
  
  export default ViewUsers;