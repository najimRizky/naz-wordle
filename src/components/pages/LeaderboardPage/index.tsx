"use client"

import Flag from "@/components/modules/Flag"
import Spinner from "@/components/modules/Spinner"
import { useLeaderboardPageModel } from "./model"

const LeaderboardPage = () => {
  const {
    leaderboardData,
    loading,
    session,
    userContext
  } = useLeaderboardPageModel()

  return (
    <div className="container my-8">
      <h1 className="text-center text-lg">LEADERBOARD</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-auto">
          <table className="w-full mt-6">
            <thead>
              <tr className="border-b border-slate-400 ">
                <th></th>
                <th className="text-left pb-4 pl-2 whitespace-nowrap">Username</th>
                <th className="text-left pb-4 pl-2 whitespace-nowrap">Wins</th>
                <th className="text-left pb-4 pl-2 whitespace-nowrap">Losses</th>
                <th className="text-left pb-4 pl-2 whitespace-nowrap">Total Games</th>
                <th className="text-left pb-4 pl-2 whitespace-nowrap">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData?.leaderboard?.map((user: any, index: number) => (
                <tr
                  className={`border-b border-slate-400 
                ${session && user.username === userContext?.username ? 'bg-red-200 font-bold' : ''}`}
                  key={index}
                >
                  <td className="p-2 text-right text-xl font-bold">{index + 1}</td>
                  <td className="p-2 text-sm flex gap-x-3"><Flag countryCode={user?.country} /> @{user.username}</td>
                  <td className="p-2">{user.stats.wins}</td>
                  <td className="p-2">{user.stats.losses}</td>
                  <td className="p-2">{user.stats.total}</td>
                  <td className="p-2">{(user.stats.percentage * 100).toFixed(2)}%</td>
                </tr>
              ))}
              {(session && leaderboardData?.user?.position > 10) && (
                <>
                  <tr>
                    <td className="h-10 py-2">
                      <div className="border-r-4 h-full border-dotted border-slate-500 mr-4" />
                    </td>
                  </tr>
                  <tr className="border-b border-slate-400 bg-red-200 font-bold">
                    <td className="p-2 text-right text-xl font-bold">{leaderboardData?.user?.position}</td>
                    <td className="p-2 text-sm">@{leaderboardData?.user?.username}</td>
                    <td className="p-2">{leaderboardData?.user?.stats.wins}</td>
                    <td className="p-2">{leaderboardData?.user?.stats.losses}</td>
                    <td className="p-2">{leaderboardData?.user?.stats.total}</td>
                    <td className="p-2">{(leaderboardData?.user?.stats.percentage * 100).toFixed(2)}%</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default LeaderboardPage