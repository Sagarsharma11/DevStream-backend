import pandas as pd

# Sample data
data = {
    "text": [
        "The new AI technology is amazing.", "Machine learning is a subset of AI.",
        "Advancements in blockchain are impressive.", "The stock market trends are fluctuating.",
        "Robotics and automation are changing industries.", "The latest smartphone release is intriguing.",
        "Artificial Intelligence is revolutionizing the tech world.", "Global warming is a critical issue.",
        "Quantum computing is a growing field.", "The weather today is quite pleasant.",
        "Tech startups are thriving in the current market.", "The new movie is a blockbuster.",
        "Cryptocurrency market is very volatile.", "Eating healthy is important for wellness.",
        "The latest gaming console has incredible features.", "The new book is a thrilling read.",
        "Tech conferences are a great opportunity for networking.", "The economy is experiencing ups and downs.",
        "Cloud computing services are evolving rapidly.", "The local festival was a fun event.",
        "Cybersecurity threats are increasing.", "The new restaurant in town is highly recommended.",
        "Tech giants are investing heavily in AI.", "The summer vacation was relaxing.",
        "The newest tablet offers great performance.", "The historical documentary was insightful.",
        "Wearable tech is gaining popularity.", "The latest fashion trends are eye-catching.",
        "The tech industry is seeing rapid growth.", "The classical music concert was mesmerizing.",
        "Augmented reality is an exciting technology.", "The new gym equipment is state-of-the-art.",
        "Innovations in 5G technology are promising.", "The science fair had many interesting projects.",
        "Electric vehicles are becoming mainstream.", "The local sports team had a great game.",
        "New software updates are being released regularly.", "The art exhibition was impressive.",
        "Tech startups are shaping the future.", "The recent news about space exploration is fascinating.",
        "The tech conference provided valuable insights.", "The weekend getaway was refreshing.",
        "The new smartwatch features advanced health monitoring.", "The charity event was well-organized.",
        "Recent advancements in AI are noteworthy.", "The local farmers' market is worth visiting.",
        "The future of virtual reality looks bright.", "The newly opened café has a cozy atmosphere.",
        "Advancements in renewable energy are significant.", "The film festival showcased diverse films.",
        "The new drone technology is revolutionary.", "The hiking trail offered stunning views.",
        "Recent trends in fintech are transforming finance.", "The local theatre production was outstanding.",
        "The new electric bike is eco-friendly.", "The new online course offers great learning opportunities.",
        "The tech industry is embracing sustainability.", "The local science museum is educational.",
        "The latest tech gadgets are innovative.", "The yoga retreat was rejuvenating.",
        "The rise of quantum computing is exciting.", "The local bookstore has a vast collection.",
        "The tech industry faces various challenges.", "The culinary workshop was informative.",
        "The latest advancements in nanotechnology are impressive.", "The local zoo has new exhibits.",
        "The new home automation system is convenient.", "The city’s cultural festival was lively.",
        "Tech companies are focusing on AI ethics.", "The botanical garden is beautiful.",
        "The latest advancements in biotechnology are groundbreaking.", "The new music album is a hit.",
        "The tech industry’s growth is accelerating.", "The cooking class was enjoyable.",
        "The future of robotics is promising.", "The local community event was engaging.",
        "Recent developments in 3D printing are transformative.", "The local park is a great place to relax.",
        "The tech world is buzzing with new innovations.", "The art class was creative.",
        "The latest advances in autonomous vehicles are exciting.", "The new documentary on wildlife is enlightening.",
        "Tech leaders are addressing global challenges.", "The new restaurant offers a unique dining experience.",
        "The growth of e-commerce is remarkable.", "The local gym offers diverse fitness programs.",
        "New breakthroughs in AI research are significant.", "The local theatre is hosting a new play.",
        "The evolution of mobile technology is rapid.", "The city’s music festival was a success.",
        "The future of space technology is intriguing.", "The local farmers' market has fresh produce.",
        "The latest advancements in smart home devices are impressive.", "The city’s annual parade was festive.",
        "The new software solution is efficient.", "The local art gallery is showcasing new exhibits.",
        "Tech advancements are transforming daily life.", "The local aquarium has new marine life exhibits."
    ],
    "label": [
        "Technology-Related", "Technology-Related", "Technology-Related", "Non-Technology",
        "Technology-Related", "Technology-Related", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology",
        "Technology-Related", "Non-Technology", "Technology-Related", "Non-Technology"
    ]
}

# Convert to DataFrame and save to CSV
df = pd.DataFrame(data)
df.to_csv('sample_data.csv', index=False)

print("Sample dataset created and saved as 'sample_data.csv'.")
