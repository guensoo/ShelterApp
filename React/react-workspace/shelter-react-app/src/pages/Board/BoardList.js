import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const dummyPosts = [
  { id: 1, title: "첫 글입니다", author: "user1", createdAt: "2025-06-15" },
  { id: 2, title: "두 번째 글", author: "user2", createdAt: "2025-06-14" },
];

const BoardList = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>📝 게시글 목록</Typography>
      <List>
        {dummyPosts.map((post) => (
          <ListItem
            key={post.id}
            button
            onClick={() => navigate(`/board/${post.id}`)}
            divider
          >
            <ListItemText
              primary={post.title}
              secondary={`작성자: ${post.author} | ${post.createdAt}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BoardList;
