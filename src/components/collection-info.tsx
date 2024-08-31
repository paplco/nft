import { cn } from "@/lib/utils";

const CollectionInfo: React.FC<{
  name: string;
  description: string;
  coverImage: string;
  nftImage: string;
  production: string;
  supply: number;
}> = ({ name, description, coverImage, nftImage, production, supply }) => {
  const classNameColLeft = "text-sm font-bold bg-white/10 px-4 py-4";
  const classNameColRight = "text-sm px-4 py-4";
  return (
    <div className="grid grid-cols-[20%,1fr] border bg-[#345d4b] overflow-hidden rounded-2xl !text-white mb-12 shadow-xl drop-shadow-lg">
      <div className={classNameColLeft}>Name</div>
      <div className={cn(classNameColRight, "text-xl ")}>{name}</div>
      <div className={classNameColLeft}>Description</div>
      <div className={classNameColRight}>{description}</div>
      <div className={classNameColLeft}>Production</div>
      <div className={classNameColRight}>{production}</div>
      <div className={classNameColLeft}>Cover Image</div>
      <div className={classNameColRight}>
        <img src={coverImage} alt="cover image" className={`w-1/2`} />
      </div>
      <div className={classNameColLeft}>NFT Image</div>
      <div className={classNameColRight}>
        {/* <img src={nftImage} alt="nft image" /> */}
        {nftImage}
      </div>
      <div className={classNameColLeft}>Supply</div>
      <div className={classNameColRight}>{supply}</div>
    </div>
  );
};

export default CollectionInfo;
