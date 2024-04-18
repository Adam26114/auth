import Background from "@/components/Background";

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Background>
                <div className="flex items-center space-x-1">
                    Loading
                    <div className="flex items-center">
                        <div className="animate-bounce">•</div>
                        <div className="animate-bounce delay-200">•</div>
                        <div className="animate-bounce delay-400">•</div>
                    </div>
                </div>
            </Background>
        </div>
    );
}
