import useStyles from './useStyles';
import { Typography, IconButton, Box } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { useParams } from 'react-router-dom';
import CommentIcon from '@material-ui/icons/Comment';

const FetchBlog = (): JSX.Element => {
  const { root, img, title, body } = useStyles();
  const params = useParams();
  const { id } = Object(params);
  console.log(id);
  return (
    <>
      <Box className={root}>
        <Typography className={title}>title goes here</Typography>
        <img src="https://team-dumplings.s3.amazonaws.com/blogs02.jpg" className={img} />
        <Typography className={body}>
          As work becomes more remote, companies are looking to outsource much of their team’s workload to offshore
          companies, if they haven’t done so already. There’s plenty of pros and cons of doing so. But is it ethical?
          It’s complicated, like everything is on a global scale. Outsourcing has many advantages, like helping your
          country remain globally competitive, allowing people all over the world to access jobs otherwise unavailable
          to them, cutting costs, and creating greater diversity and cooperation. Upscaling and downscaling can be done
          easily as running out of pools to hire from is no longer an issue when you can hire anywhere. Outsourcing
          vendors or BPOs (Business Process Outsource) can do the work of screening and hiring for you. And you can
          maximize your in-house team’s productivity by outsourcing all those tedious administrative tasks that get in
          the way. However, outsourcing also allows companies to avoid paying local workers the wages they demand, and
          instead hire those from areas with lower costs of living asking for lower wages. It takes away jobs from your
          home country, and while it does bring money into offshore countries it also takes away workers who might
          otherwise be contributing in their own communities. Offshoring is touted as opening up opportunities to
          everyone everywhere, but it doesn’t really work like that. The allure of offshoring is high quality work from
          experienced workers for low prices. That, by definition, is going to cut a lot of people out and not make
          things fairer for everyone. Currently some of the hottest markets for outsourcing are India, the Philippines,
          Indonesia, and Ukraine. The fact that there are top outsourcing markets indicates that there are many places
          that do not make the cut. Most companies will look for a vendor or BPO so they don’t have to go around hiring
          people individually, meaning that even if you are a skilled, experienced developer living somewhere with a
          comparatively lower cost of living, if you aren’t working for an offshore vendor or BPO your chances of
          getting hired as an individual are slim. With this in mind, how do you make outsourcing as ethical as
          possible? The answer is that it’s complicated. Most of it comes down to the offshore vendor you go with,
          assuming you will be going with a vendor instead of just opening your job applications globally and doing the
          screening and hiring yourself. Choose a few vendors and do a deeper dive on each individually. Look for any
          reviews from past clients you can find, and contact them if you can. Do your research on the vendor to assess
          the quality of their work, while making sure they treat their workers fairly. Do some market research to
          verify if offshore workers are being paid at local market rates. The more you know about the local market and
          standard working conditions there, the better. You are aiming to at least match, if not exceed them. Then
          there’s security concerns around data leakage to consider. Putting sensitive client data in the hands of an
          offshore company can be risky, and you want to be certain the company will do everything they can to keep that
        </Typography>
        <Box>
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default FetchBlog;
