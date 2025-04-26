import os
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI, HuggingFacePipeline
from langchain.document_loaders import DirectoryLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from typing import List, Union
from tqdm import tqdm
from .models.load_model import load_custom_model

class JagedoRAG:
    def __init__(self, model_type: str = "openai"):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        
        # Initialize LLM
        if model_type == "openai":
            self.llm = OpenAI(
                temperature=0.3,
                openai_api_key=os.getenv("OPENAI_API_KEY")
            )
        else:
            self.llm = load_custom_model()
        
        self.vector_store = None
        self.retriever = None

    def initialize_vector_store(self, data_path: str = "data"):
        """Initialize vector store from documents"""
        loader = DirectoryLoader(
            data_path,
            glob="**/*.pdf",
            loader_kwargs={"mode": "elements"}
        )
        documents = loader.load()
        
        # Split and embed documents
        splits = self.text_splitter.split_documents(documents)
        self.vector_store = FAISS.from_documents(splits, self.embeddings)
        self.retriever = self.vector_store.as_retriever(search_kwargs={"k": 5})

    def create_chain(self):
        """Create retrieval QA chain"""
        return RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="map_reduce",
            retriever=self.retriever,
            return_source_documents=True
        )

    async def query(self, question: str) -> dict:
        """Execute RAG query"""
        qa_chain = self.create_chain()
        result = qa_chain({"query": question})
        return {
            "answer": result["result"],
            "sources": [doc.metadata["source"] for doc in result["source_documents"]]
        }

    def add_documents(self, documents: List[Union[str, dict]]):
        """Add new documents to vector store"""
        processed_docs = self.text_splitter.split_documents(documents)
        self.vector_store.add_documents(processed_docs)