import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import useFetch from "@/lib/useFetch";
import { getUrls } from "@/utils/apiUrls";
import { User } from "@/context/UserContext";
import { getClicksForUrl } from "@/utils/apiUrls/clicks";
import MainLoader from "@/components/Loader";
import LinkCard from "@/components/link-card";
import CreateNew from "@/components/create-new";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(User);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchParams.get("createNew") && !isAuthenticated) {
      navigate(`/auth?${searchParams}`);
    }
  }, [isAuthenticated]);

  const {
    loading: urlLoading,
    fn: getUrlsFn,
    data: urlData,
    error: urlError,
  } = useFetch(getUrls, user?.id);

  const {
    loading: clicksLoading,
    fn: getClicksFn,
    data: clickData,
    error: clickError,
  } = useFetch(
    getClicksForUrl,
    urlData?.map((u) => u?.id)
  );

  useEffect(() => {
    getUrlsFn();
  }, []);

  useEffect(() => {
    if (urlData?.length) {
      getClicksFn();
    }
  }, [urlData?.length]);

  if (urlLoading) {
    return <MainLoader />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urlData?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicksLoading ? "Loading.." : clickData?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-2xl font-extrabold">My Links</p>
        <div>
          <CreateNew fetchUrl={getUrlsFn} />
        </div>
      </div>
      <div className="relative mt-5">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Filter"
        />
        <FilterIcon className="absolute top-2 right-2" />
      </div>
      <div>
        {urlData?.map((d, index) => {
          return <LinkCard key={index} data={d} fetchUrl={getUrlsFn} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
