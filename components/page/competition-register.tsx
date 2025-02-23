"use client"

import { useSearchParams } from "next/navigation";
import NavigationBar from "../navigation-bar";
import TeamRegistrationForm from "../form/team-registration-form";
import useSWR from "swr";
import axiosInstance from "@/lib/axios";
import { ICompetition } from "../types/competition";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const CompetitionRegisterPage = () => {
  const searchParams = useSearchParams();
  const competitionID = searchParams.get("id");
  const { data } = useSWR(`/competition/${competitionID}`, fetcher);
  return (
    <div className="bg-none lg:bg-[url('/images/DSCF4041-3.png')] bg-blend-lighten bg-gray-900 bg-center bg-cover h-full 2xl:h-screen before:top-0 before:left-0 w-full bg-no-repeat before:absolute before:z-0 before:content-['a'] before:h-full before:w-full lg:px-20 lg:py-16">
      <NavigationBar />
      <div className='px-3 lg:my-0 md:px-14 md:py-10 lg:px-28 lg:mx-auto py-5 relative z-10 w-full'>
        <div className='bg-[#F9FAFB] rounded-md lg:bg-[url("/images/logo.png")] bg-blend-lighten'>
          <div className='flex flex-col px-5 py-8 lg:px-20 lg:py-16 lg:justify-center w-full'>
            <div className='flex-col text-sm mb-5'>
              <h1 className='text-[#3B82F6] uppercase text-base lg:text-xl font-bold font-sans'>Formulir Pendaftaran Lomba</h1>
              <p className='text-xs'>Formulir Untuk melakukan pendaftaran lomba</p>
            </div>
            <div className='lg:max-w-full'>
            {data  && (data.data as ICompetition).status?.data.is_open ?
              <TeamRegistrationForm data={data.data}/> : "Formulir tidak tersedia."
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompetitionRegisterPage;