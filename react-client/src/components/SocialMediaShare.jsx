import {
    FacebookShareButton,
    FacebookIcon,
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";

export default function SocialMediaShare({place}) {
    const shareFBUrl = 'https://www.facebook.com/';
    const shareRDUrl = 'https://www.reddit.com/';
    const shareTWUrl = 'https://www.twitter.com/';
    const shareWAUrl = 'https://www.whatsapp.com/';

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
        <h2 className="font-normal">Help us share and promote <span className="text-lg font-semibold">{place.title}</span></h2>
        <div className="flex gap-4 items-center">
            <FacebookShareButton url={shareFBUrl}
                                    hashtag={`#${place.address.split(',')[0]}`}
                                    className="transition ease-in delay-150 hover:scale-125">
                <FacebookIcon size={40} round={true}/>
            </FacebookShareButton>
            <RedditShareButton url={shareRDUrl}
                                    hashtag={`#${place.address.split(',')[0]}`} 
                                    className="transition ease-in delay-150 hover:scale-125">
                <RedditIcon size={40} round={true}/>
            </RedditShareButton>
            <TwitterShareButton url={shareTWUrl}
                                    hashtag={`#${place.address.split(',')[0]}`} 
                                    className="transition ease-in delay-150 hover:scale-125">
                <TwitterIcon size={40} round={true}/>
            </TwitterShareButton>
            <WhatsappShareButton url={shareWAUrl}
                                    hashtag={`#${place.address.split(',')[0]}`} 
                                    className="transition ease-in delay-150 hover:scale-125">
                <WhatsappIcon size={40} round={true}/>
            </WhatsappShareButton>
        </div>
    </div>
  )
}
