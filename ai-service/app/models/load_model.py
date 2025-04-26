from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from langchain.llms import HuggingFacePipeline

def load_custom_model(model_name: str = "jagedo-llm"):
    try:
        # Load fine-tuned model
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(model_name)
        
        # Create pipeline
        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_new_tokens=500,
            temperature=0.3,
            device_map="auto"
        )
        
        return HuggingFacePipeline(pipeline=pipe)
    except Exception as e:
        raise RuntimeError(f"Failed to load model: {str(e)}")