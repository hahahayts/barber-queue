import { getAllQueue } from "@/actions/query";
import { Queue } from "@prisma/client";
import { AddButton, FinishButton } from "../_components/Button";
import { currentUser } from "@clerk/nextjs/server";

export default async function BarberQueue() {
  const queue: Queue[] = await getAllQueue();
  const user = await currentUser();

  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Themed Header */}

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Skip the Wait, Join the Queue
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Know exactly when it's your turn before you even arrive at the
              barbershop.
            </p>
          </div>

          {/* Queue List */}
          <div id="queue-status" className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Current Queue
              </h3>
              <div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
                {queue.length} waiting
              </div>
            </div>

            {queue.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-in Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estimated Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {queue.map((person, index) => (
                      <tr
                        key={person.id}
                        className={index === 0 ? "bg-green-50" : ""}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index === 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Current
                            </span>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span>
                            {person.name === user?.fullName
                              ? "You"
                              : person.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.check_in_time.toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.estimated_time.toLocaleTimeString()}
                        </td>
                        {user?.publicMetadata.role === "admin" && (
                          <td>
                            <FinishButton id={person.id} />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">
                No one is currently in the queue.
              </p>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Average wait time: 15 minutes per customer</p>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end  mt-10">
            <AddButton
              label="Join the Queue"
              id={user?.id}
              name={user?.fullName}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Barber Queue. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Skip the wait. Get the cut.
          </p>
        </div>
      </footer>
    </div>
  );
}
