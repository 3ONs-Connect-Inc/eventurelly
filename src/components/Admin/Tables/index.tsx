import { Card, CardContent } from "../ui/Card";


const Tables = () => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4">User Data</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2">John Doe</td>
              <td className="border p-2">john@example.com</td>
            </tr>
            <tr>
              <td className="border p-2">2</td>
              <td className="border p-2">Jane Smith</td>
              <td className="border p-2">jane@example.com</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default Tables;
