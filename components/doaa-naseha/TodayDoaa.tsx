const TodayDoaa = () => {
  return (
    <div className="md:col-span-3 flex flex-col gap-6">
          <div className="bg-card rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-primary mb-2">💡 دعاء اليوم</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              اللهم اجعل هذا اليوم يوم خير وبركة ووفقنا لما تحبه وترضاه.
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-primary mb-2">📌 نصيحة يومية</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              داوم على ذكر الله في كل صغيرة وكبيرة، فذكر الله راحة للقلب وطمأنينة للنفس.
            </p>
          </div>
        </div>
  )
};

export default TodayDoaa;