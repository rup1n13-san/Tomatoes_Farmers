'use client';

export default function CommentsPage() {
  return (
    <div className="px-6 py-6">
 
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">Comment List</h1>
        <span className="text-xs text-gray-500">Showing 2 comments</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#f5f5f8] text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Created Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {/* Comment 1 */}
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500">1</td>
              <td className="px-4 py-3 font-medium text-gray-900">Hooked</td>
              <td className="px-4 py-3 text-gray-700">Nick Allen</td>
              <td className="px-4 py-3 text-gray-600">
                This show had me from the first episode. The plot twists were
                unexpected and thrilling.
              </td>
              <td className="px-4 py-3 text-gray-500">2020-07-21</td>
              <td className="px-4 py-3 text-right text-xs">
                <button className="mr-2 rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100">
                  Edit
                </button>
                <button className="mr-2 rounded-md px-2 py-1 text-red-600 hover:bg-red-50">
                  Delete
                </button>
                <button className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50">
                  View
                </button>
              </td>
            </tr>

            {/* Comment 2 */}
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500">2</td>
              <td className="px-4 py-3 font-medium text-gray-900">
                Binge Worthy
              </td>
              <td className="px-4 py-3 text-gray-700">Lynn Guini</td>
              <td className="px-4 py-3 text-gray-600">
                I finished the whole season in one night. It’s addictive and
                really well-written!
              </td>
              <td className="px-4 py-3 text-gray-500">2020-01-01</td>
              <td className="px-4 py-3 text-right text-xs">
                <button className="mr-2 rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100">
                  Edit
                </button>
                <button className="mr-2 rounded-md px-2 py-1 text-red-600 hover:bg-red-50">
                  Delete
                </button>
                <button className="rounded-md px-2 py-1 text-blue-600 hover:bg-blue-50">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
