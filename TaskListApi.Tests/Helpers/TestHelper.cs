using FizzWare.NBuilder;

namespace TaskListApi.Tests.Helpers {
    public class TestHelper {
        private const GeneratorDirection GeneratorDirection = FizzWare.NBuilder.GeneratorDirection.Ascending;

        public static SequentialGenerator<int> IntSequentialGenerator = new SequentialGenerator<int> {
            Direction = GeneratorDirection
        };
    }
}