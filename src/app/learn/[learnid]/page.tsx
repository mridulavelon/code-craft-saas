import OutputPanel from "@/app/compiler/_components/OutputPanel";
import EditorPanel from "@/app/compiler/_components/EditorPanel";
import Header from "@/app/compiler/_components/Header";
import axios from 'axios';
import Topics from "./_components/Topics";


const getLangData = async(langId:string) => {
  try{
    const langDataRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/language/${langId}`);
    const langRequestResponse = langDataRequest.data;
    return langRequestResponse.data;
  }catch(error:any){
    return {error:error.message};
  }
}

const LearnTechPage = async({ params }: { params: { learnid: string } }) => {
  const paramsData = await params;
  const langResponse = await getLangData(paramsData.learnid);
  

  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
      <Header />
        <div className="flex flex-row gap-2">
         <div className="bg-[#0a0a0f]/80 p-4 rounded-lg font-semibold w-1/6 overflow-y-scroll">
         <Topics topics={langResponse.topics}/>
         </div>
        <div className="flex flex-col gap-2 w-5/6">
        <EditorPanel />
        <OutputPanel />
        </div>
        </div>
      </div>
    </div>
  );
}
export default LearnTechPage;