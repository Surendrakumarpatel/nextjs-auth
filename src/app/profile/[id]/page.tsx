export default function UserProfile({ params }: any) {
    
    return (
        <div>
            <h1>Profile Page <span className="font-bold">{params.id}</span></h1>
        </div>
    )
}